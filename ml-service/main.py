from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from datetime import datetime
from io import BytesIO

app = FastAPI(title="StockSense ML Microservice")

import os

raw_origins = os.environ.get("ALLOWED_ORIGINS", "*")
if raw_origins.strip() == "*":
    origins = ["*"]
else:
    origins = [o.strip() for o in raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to StockSense ML Microservice API", "status": "running"}

@app.get("/health/{store_id}")
async def compute_stock_health(store_id: str):
    # TODO: Implement compute stock health logic for all SKUs
    return {"status": "ok", "store_id": store_id, "message": "Stock health computed"}

@app.post("/ingest/csv")
async def ingest_csv(file: UploadFile = File(...)):
    if not (file.filename.endswith(".csv") or file.filename.endswith(".xlsx")):
        raise HTTPException(status_code=400, detail="Invalid file type. Only .csv or .xlsx allowed.")
    
    content = await file.read()
    
    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(BytesIO(content))
        else:
            try:
                df = pd.read_excel(BytesIO(content), engine='openpyxl')
            except Exception:
                df = pd.read_excel(BytesIO(content), engine='xlrd')
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse file: {str(e)}")

    # TODO: Pass dataframe to attribute tagger, then save to DB
    return {"status": "ok", "rows": len(df)}

class GuideRequest(BaseModel):
    store_id: str
    market_trip_date: str

@app.post("/guide/generate")
async def generate_buyer_guide(request: GuideRequest):
    # TODO: Implement buyer guide generation via Ensemble
    return {"status": "ok", "store_id": request.store_id, "guide": {}}

@app.get("/trends/{city}")
async def get_trends(city: str):
    # TODO: Return actual trend signals for city from database
    trends_data = [
        {
            "id": 1,
            "name": "Mirror-work co-ords",
            "trajectory": "rising",
            "sources": ["Myntra", "Instagram"],
            "age": "Rising for 14 days",
            "peak": "Expected to peak in ~8 days",
            "stock": 0,
            "sparkline": [{"v": 10}, {"v": 15}, {"v": 25}, {"v": 45}, {"v": 70}, {"v": 85}, {"v": 100}]
        },
        {
            "id": 2,
            "name": "Pastel Anarkalis",
            "trajectory": "peaking",
            "sources": ["Google Trends", "Myntra"],
            "age": "Peaking for 3 days",
            "peak": "Currently peaking",
            "stock": 8,
            "sparkline": [{"v": 60}, {"v": 80}, {"v": 95}, {"v": 100}, {"v": 98}, {"v": 95}, {"v": 90}]
        },
        {
            "id": 3,
            "name": "Neon prints",
            "trajectory": "declining",
            "sources": ["Instagram"],
            "age": "Declining for 3 weeks",
            "peak": "Peaked 21 days ago",
            "stock": 15,
            "sparkline": [{"v": 100}, {"v": 80}, {"v": 60}, {"v": 45}, {"v": 30}, {"v": 20}, {"v": 10}]
        }
    ]
    return {"status": "ok", "city": city, "trends": trends_data}

@app.get("/markdown/{store_id}")
async def get_markdown_recommendations(store_id: str):
    # TODO: Compute markdown recommendations
    return {"status": "ok", "store_id": store_id, "markdowns": []}

@app.get("/size-curve/{store_id}")
async def get_size_curve_corrections(store_id: str):
    # TODO: Return size curve corrections
    return {"status": "ok", "store_id": store_id, "size_curves": {}}

@app.get("/gmroi/{store_id}")
async def get_gmroi(store_id: str):
    # TODO: Calculate GMROI by category
    return {"status": "ok", "store_id": store_id, "gmroi": {}}

@app.get("/supplier/{store_id}")
async def get_supplier_scorecards(store_id: str):
    # TODO: Supplier scorecards
    return {"status": "ok", "store_id": store_id, "suppliers": []}

@app.get("/season/{store_id}")
async def get_season_debrief(store_id: str):
    # TODO: Season debrief
    return {"status": "ok", "store_id": store_id, "debrief": {}}

@app.get("/morning/{store_id}")
async def get_morning_briefing(store_id: str):
    # TODO: Morning briefing data
    return {"status": "ok", "store_id": store_id, "briefing": {}}

@app.get("/customers/{store_id}")
async def get_customers_data(store_id: str):
    # TODO: Customer memory + lapsed flags
    return {"status": "ok", "store_id": store_id, "customers": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
