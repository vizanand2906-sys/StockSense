import asyncio
from datetime import datetime, date
from pytrends.request import TrendReq
from playwright.async_api import async_playwright
import instaloader
import os

FASHION_KEYWORDS = [
    "anarkali", "lehenga", "kurta", "co-ord set", "saree", "salwar", "kurti",
    "mirror work", "organza", "georgette", "cotton kurta", "linen co-ord",
    "corset top", "cargo pants", "oversized tee", "cropped hoodie",
    "ethnic wear bangalore", "indo-western", "fusion wear",
    "designer kurta", "palazzo", "sharara", "dhoti pants"
]

FASHION_HASHTAGS = [
    'anarkali', 'lehenga', 'ethnicwear', 'designerkurta', 'mirrorwork',
    'linencoord', 'corset', 'cargopants', 'indowestern', 'fusionwear',
    'coordset', 'organzasaree', 'cottonfashion', 'palazzopants',
    'ethnicootd', 'indianfashion', 'boutiquelovers', 'ethnicboutique'
]

def save_trend_signal(keyword: str, source: str, velocity_score: float, trajectory: str, city: str):
    # TODO: Implement saving to Supabase trend_signals table
    pass

def log_scraper_run(scraper_name: str, status: str, records_collected: int, error: str = None):
    # TODO: Log scraper health to Supabase scraper_health table
    pass

def compute_trajectory(keyword: str, velocity: float) -> str:
    # Dummy logic to calculate trajectory
    if velocity > 75: return 'peaking'
    elif velocity > 50: return 'rising'
    return 'declining'

# Google Trends Collector
def pull_google_trends():
    try:
        pytrends = TrendReq(hl='en-IN', tz=330)
        for keyword in FASHION_KEYWORDS:
            pytrends.build_payload([keyword], timeframe='now 7-d', geo='IN-KA')
            data = pytrends.interest_over_time()
            if not data.empty:
                velocity = data[keyword].mean()
                trajectory = compute_trajectory(keyword, velocity)
                save_trend_signal(
                    keyword=keyword,
                    source='google',
                    velocity_score=velocity,
                    trajectory=trajectory,
                    city='Bangalore'
                )
        log_scraper_run('google_trends', 'success', len(FASHION_KEYWORDS))
    except Exception as e:
        log_scraper_run('google_trends', 'failed', 0, str(e))

# Myntra Bestseller Scraper
async def scrape_myntra_bestsellers():
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            await page.goto("https://www.myntra.com/women-ethnic", wait_until='networkidle')
            await asyncio.sleep(3)
            
            for _ in range(5):
                await page.evaluate("window.scrollBy(0, 800)")
                await asyncio.sleep(1.5)
                
            items = await page.query_selector_all('.product-base')
            results = []
            for rank, item in enumerate(items[:50], 1):
                name_el = await item.query_selector('.product-product')
                if name_el:
                    name = await name_el.inner_text()
                    results.append({'rank': rank, 'name': name, 'source': 'myntra'})
            
            await browser.close()
            
            if len(results) < 10:
                log_scraper_run('myntra', 'warning', len(results), 'returned fewer than 10 results')
            else:
                log_scraper_run('myntra', 'success', len(results))
    except Exception as e:
        log_scraper_run('myntra', 'failed', 0, str(e))

# Instagram Hashtag Velocity Tracker
def get_previous_hashtag_count(hashtag: str) -> int:
    return 1000 # Dummy previous count for calculation

def track_hashtag_velocity():
    try:
        L = instaloader.Instaloader()
        records_collected = 0
        for hashtag in FASHION_HASHTAGS:
            try:
                posts = instaloader.Hashtag.from_name(L.context, hashtag)
                post_count = posts.mediacount
                
                previous = get_previous_hashtag_count(hashtag)
                growth_rate = (post_count - previous) / previous if previous > 0 else 0
                
                trajectory = 'rising' if growth_rate > 0.30 else 'peaking' if growth_rate > 0.05 else 'declining'
                
                save_trend_signal(
                    keyword=f'#{hashtag}',
                    source='instagram',
                    velocity_score=growth_rate * 100,
                    trajectory=trajectory,
                    city='Bangalore'
                )
                records_collected += 1
            except Exception as e:
                # Log internally but continue
                continue
        log_scraper_run('instagram', 'success', records_collected)
    except Exception as e:
        log_scraper_run('instagram', 'failed', 0, str(e))

# Festival Calendar (Hardcoded JSON)
FESTIVAL_CALENDAR = {
    "2026": [
        {"name": "Pongal", "date": "2026-01-14", "region": "South India", "lead_weeks": 3},
        {"name": "Valentine's Day", "date": "2026-02-14", "region": "All India", "lead_weeks": 2},
        {"name": "Ugadi", "date": "2026-03-19", "region": "Karnataka", "lead_weeks": 3},
        {"name": "Eid ul-Fitr", "date": "2026-03-20", "region": "All India", "lead_weeks": 4},
        {"name": "Navratri", "date": "2026-10-08", "region": "All India", "lead_weeks": 4},
        {"name": "Dussehra", "date": "2026-10-17", "region": "All India", "lead_weeks": 3},
        {"name": "Diwali", "date": "2026-11-05", "region": "All India", "lead_weeks": 5},
        {"name": "Eid ul-Adha", "date": "2026-05-27", "region": "All India", "lead_weeks": 4},
        {"name": "Onam", "date": "2026-08-26", "region": "Kerala", "lead_weeks": 3},
        {"name": "Raksha Bandhan", "date": "2026-08-09", "region": "All India", "lead_weeks": 3},
        {"name": "Ganesh Chaturthi", "date": "2026-08-15", "region": "Maharashtra/Karnataka", "lead_weeks": 3},
        {"name": "Christmas", "date": "2026-12-25", "region": "All India", "lead_weeks": 3},
        {"name": "New Year", "date": "2026-12-31", "region": "All India", "lead_weeks": 2}
    ]
}

def get_upcoming_festival_flags(weeks_ahead: int = 6) -> list:
    today = date.today()
    upcoming = []
    for year_data in FESTIVAL_CALENDAR.values():
        for festival in year_data:
            festival_date = date.fromisoformat(festival['date'])
            days_until = (festival_date - today).days
            if 0 <= days_until <= (weeks_ahead * 7):
                upcoming.append({
                    **festival,
                    'days_until': days_until,
                    'weeks_until': days_until // 7
                })
    return sorted(upcoming, key=lambda x: x['days_until'])

if __name__ == "__main__":
    print("Running Google Trends scraper...")
    pull_google_trends()
    
    print("Running Myntra Bestsellers scraper...")
    asyncio.run(scrape_myntra_bestsellers())
    
    print("Running Instagram Hashtag scraper...")
    track_hashtag_velocity()
    
    print("Done running scrapers.")
