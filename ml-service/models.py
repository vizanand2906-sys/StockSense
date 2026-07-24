import json
from datetime import datetime
import pandas as pd
import numpy as np
from prophet import Prophet
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import LabelEncoder
from openai import AsyncOpenAI
import os
from typing import Dict, Any, List

openai_client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY", ""))

# Model 1 — GPT-4o-mini Attribute Tagger
async def tag_sku(raw_name: str) -> dict:
    prompt = f"""
    Extract attributes from this Indian apparel item name.
    Return JSON only. No explanation. No markdown.
    
    Item: "{raw_name}"
    
    Return exactly this structure:
    {{
      "style_family": "anarkali|kurta|lehenga|co-ord|saree|salwar|western|fusion|other",
      "colour_family": "pastel|bright|dark|neutral|printed|multicolour",
      "occasion": "casual|festive|formal|bridal|daily",
      "size": "XS|S|M|L|XL|XXL|free|unknown",
      "price_band": "budget|mid|premium|luxury",
      "fabric_weight": "light|medium|heavy|unknown",
      "confidence": <float 0.0-1.0>
    }}
    
    Rules:
    - budget = under ₹800, mid = ₹800-2000, premium = ₹2000-5000, luxury = above ₹5000
    - If item code is abbreviated with no description, set confidence below 0.5
    - Indian ethnic wear specific: anarkali, kurta, lehenga, saree, salwar are ethnic
    """
    try:
        response = await openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            response_format={"type": "json_object"}
        )
        result = json.loads(response.choices[0].message.content)
        result['needs_review'] = result.get('confidence', 0) < 0.7
        return result
    except Exception as e:
        print(f"Error tagging sku: {e}")
        return {"needs_review": True, "confidence": 0}

# Model 2 — Facebook Prophet Sell-Through Forecaster
def get_weekly_cluster_sales(store_id: str, cluster: dict) -> pd.DataFrame:
    # TODO: Fetch from Supabase based on cluster attributes
    return pd.DataFrame()

def add_future_regressors(future: pd.DataFrame) -> pd.DataFrame:
    # TODO: Fetch upcoming weather and trends to add to future dataframe
    for col in ['google_trends_index', 'temperature', 'week_of_season']:
        if col not in future.columns:
            future[col] = 0
    for festival in ['diwali', 'eid', 'navratri', 'rakhi', 'onam', 'pongal', 'ugadi']:
        future[f'{festival}_flag'] = 0
    return future

def build_sell_through_forecast(store_id: str, cluster: dict, weeks_of_data: int):
    df = get_weekly_cluster_sales(store_id, cluster)
    if len(df) < 8:
        return None # Fall back to cold-start
    
    df = df.rename(columns={'week': 'ds', 'units_sold': 'y'})
    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=False,
        daily_seasonality=False,
        seasonality_mode='multiplicative'
    )
    
    for festival in ['diwali', 'eid', 'navratri', 'rakhi', 'onam', 'pongal', 'ugadi']:
        model.add_regressor(f'{festival}_flag')
    
    model.add_regressor('google_trends_index')
    model.add_regressor('temperature')
    model.add_regressor('week_of_season')
    
    model.fit(df)
    future = model.make_future_dataframe(periods=4, freq='W')
    future = add_future_regressors(future)
    forecast = model.predict(future)
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(4)

# Model 3 — Size Curve Model
def get_sales_by_size(store_id: str, category: str) -> dict:
    # TODO: Fetch from Supabase
    return {}

def get_neighbourhood_average(store_id: str, category: str) -> dict:
    return {}

def get_city_average(category: str) -> dict:
    return {}

def get_fallback_size_curve(store_id: str, category: str) -> dict:
    neighbourhood_curve = get_neighbourhood_average(store_id, category)
    if neighbourhood_curve: return neighbourhood_curve
    city_curve = get_city_average(category)
    if city_curve: return city_curve
    return {'XS': 5, 'S': 15, 'M': 40, 'L': 30, 'XL': 8, 'XXL': 2}

def calculate_size_curve(store_id: str, category: str) -> dict:
    sales_by_size = get_sales_by_size(store_id, category)
    total = sum(sales_by_size.values())
    if total < 20:
        return get_fallback_size_curve(store_id, category)
    return {size: round((count / total) * 100, 1) for size, count in sales_by_size.items()}

# Model 4 — Cold-Start KNN
def get_all_historical_skus_with_trajectories(store_id: str) -> pd.DataFrame:
    # TODO: Fetch from Supabase
    return pd.DataFrame()

def build_style_library(store_id: str):
    historical = get_all_historical_skus_with_trajectories(store_id)
    if historical.empty:
        return None, None, None, None
        
    encoders = {}
    feature_cols = ['style_family', 'colour_family', 'occasion', 'price_band', 'fabric_weight']
    for col in feature_cols:
        le = LabelEncoder()
        if col not in historical.columns:
            historical[col] = 'unknown'
        historical[f'{col}_enc'] = le.fit_transform(historical[col].fillna('unknown'))
        encoders[col] = le
        
    features = historical[[f'{col}_enc' for col in feature_cols]].values
    knn = NearestNeighbors(n_neighbors=min(5, len(historical)), metric='euclidean')
    knn.fit(features)
    return knn, historical, encoders, feature_cols

def predict_new_sku_trajectory(new_sku: dict, knn, historical, encoders, feature_cols):
    if knn is None:
        return [0, 0, 0, 0]
    
    new_features = np.array([[
        encoders[col].transform([new_sku.get(col, 'unknown')])[0] 
        if new_sku.get(col, 'unknown') in encoders[col].classes_ else 0 
        for col in feature_cols
    ]])
    distances, indices = knn.kneighbors(new_features)
    weights = 1 / (distances[0] + 0.001)
    weights = weights / weights.sum()
    
    neighbour_trajectories = [
        historical.iloc[i]['week_1_4_trajectory'] for i in indices[0]
    ]
    return np.average(neighbour_trajectories, weights=weights, axis=0).tolist()

# Model 5 — Ensemble Layer
def ensemble_forecast(store_id: str, cluster: dict, weeks_of_data: int) -> dict:
    if weeks_of_data >= 12:
        w_prophet, w_coldstart, w_size = 0.70, 0.15, 0.15
    elif weeks_of_data >= 8:
        w_prophet, w_coldstart, w_size = 0.55, 0.30, 0.15
    elif weeks_of_data >= 4:
        w_prophet, w_coldstart, w_size = 0.30, 0.55, 0.15
    else:
        w_prophet, w_coldstart, w_size = 0.10, 0.75, 0.15
        
    prophet_output = build_sell_through_forecast(store_id, cluster, weeks_of_data)
    knn, historical, encoders, feature_cols = build_style_library(store_id)
    coldstart_output = predict_new_sku_trajectory(cluster, knn, historical, encoders, feature_cols)
    size_output = calculate_size_curve(store_id, cluster.get('style_family', 'unknown'))
    
    if prophet_output is None:
        w_coldstart += w_prophet
        w_prophet = 0
        
    demand_forecast = (
        (w_prophet * np.array(prophet_output['yhat'].tolist()) if w_prophet > 0 else 0) +
        (w_coldstart * np.array(coldstart_output)) + 
        (w_size * np.array([size_output.get('M', 40)] * 4))
    )
    
    return {
        'cluster': cluster,
        'forecast_4wk': demand_forecast.tolist() if isinstance(demand_forecast, np.ndarray) else [0,0,0,0],
        'confidence': 'high' if weeks_of_data >= 8 else 'medium' if weeks_of_data >= 4 else 'low',
        'weights_used': {'prophet': w_prophet, 'coldstart': w_coldstart, 'size': w_size}
    }

# Recommendation Engine - Stock Health
def compute_health_status(sell_through_4wk: float, weeks_on_shelf: int) -> str:
    if sell_through_4wk > 0.60: return 'fast'
    elif sell_through_4wk > 0.35: return 'healthy'
    elif sell_through_4wk > 0.15 and weeks_on_shelf <= 8: return 'slow'
    else: return 'dead'

def compute_markdown_recommendation(sku: dict) -> dict:
    urgency = sku.get('weeks_on_shelf', 0) * (1 - sku.get('sell_through_4wk', 0))
    if urgency < 3: return None
    base_discount = min(0.15 + (urgency - 3) * 0.03, 0.50)
    clearance_probability = min(0.95, 0.40 + (base_discount * 1.2))
    cost_of_waiting = sku.get('capital_locked', 0) * 0.08
    return {
        'recommended_discount_pct': round(base_discount * 100),
        'clearance_probability': round(clearance_probability * 100),
        'cost_of_waiting_2_weeks': round(cost_of_waiting)
    }
