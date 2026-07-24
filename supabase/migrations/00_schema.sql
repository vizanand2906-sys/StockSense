-- Stores
CREATE TABLE stores (
 id uuid primary key,
 owner_id uuid, -- references auth.users in actual Supabase
 name text,
 neighbourhood text, -- residential/commercial/near-college/near-office/market
 city text default 'Bangalore',
 primary_category text, -- ethnic/western/fusion/kids/multi
 created_at timestamptz DEFAULT now()
);

-- SKUs with attribute tags
CREATE TABLE skus (
 id uuid primary key,
 store_id uuid references stores(id),
 raw_name text, -- original from Vyapar CSV
 style_family text, -- anarkali/kurta/lehenga/co-ord/saree/western/other
 colour_family text, -- pastel/bright/dark/neutral/printed
 occasion text, -- casual/festive/formal/bridal/daily
 size text, -- XS/S/M/L/XL/XXL/free/unknown
 price_band text, -- budget/mid/premium/luxury
 fabric_weight text, -- light/medium/heavy
 confidence_score float, -- 0.0-1.0 from GPT-4o-mini
 needs_review boolean default false, -- true if confidence < 0.7
 created_at timestamptz DEFAULT now()
);

-- Transactions
CREATE TABLE transactions (
 id uuid primary key,
 store_id uuid references stores(id),
 sku_id uuid references skus(id),
 date date,
 units_sold integer,
 price_per_unit numeric,
 discount_applied numeric default 0,
 created_at timestamptz DEFAULT now()
);

-- Inventory
CREATE TABLE inventory (
 id uuid primary key,
 store_id uuid references stores(id),
 sku_id uuid references skus(id),
 units_in_stock integer,
 date_received date,
 weeks_on_shelf integer,
 sell_through_4wk float,
 sell_through_8wk float,
 health_status text, -- fast/healthy/slow/dead
 cover_weeks_remaining float,
 capital_locked numeric,
 updated_at timestamptz DEFAULT now()
);

-- Customers
CREATE TABLE customers (
 id uuid primary key,
 store_id uuid references stores(id),
 name text,
 phone text,
 last_visit date,
 total_spend numeric,
 preferred_style text,
 preferred_colour text,
 preferred_price_band text,
 preferred_occasion text,
 visit_count integer default 1,
 lapsed boolean default false,
 created_at timestamptz DEFAULT now()
);

-- Suppliers
CREATE TABLE suppliers (
 id uuid primary key,
 store_id uuid references stores(id),
 name text,
 location text, -- Surat/Mumbai/Local/Jaipur/other
 category text,
 avg_lead_time_days integer,
 min_order_value numeric,
 sell_through_score float,
 reliability_score float,
 return_rate float,
 composite_score float,
 trend text -- improving/stable/declining
);

-- Lost Sales
CREATE TABLE lost_sales (
 id uuid primary key,
 store_id uuid references stores(id),
 date date,
 style_family text,
 colour_family text,
 occasion text,
 price_band text,
 customer_count integer,
 left_without_buying boolean,
 created_at timestamptz DEFAULT now()
);

-- Trend Signals
CREATE TABLE trend_signals (
 id uuid primary key,
 keyword text,
 source text, -- google/myntra/instagram/meesho
 week_start date,
 velocity_score float,
 trajectory text, -- rising/peaking/declining
 city text,
 created_at timestamptz DEFAULT now()
);

-- Buyer Guides
CREATE TABLE buyer_guides (
 id uuid primary key,
 store_id uuid references stores(id),
 generated_at timestamptz DEFAULT now(),
 market_trip_date date,
 recommendations jsonb,
 acted_on boolean,
 accuracy_logged boolean default false
);

-- Accuracy Log
CREATE TABLE accuracy_log (
 id uuid primary key,
 store_id uuid references stores(id),
 guide_id uuid references buyer_guides(id),
 recommendation text,
 confidence text, -- high/medium/low
 owner_acted boolean,
 outcome text,
 accurate boolean,
 checked_at date
);

-- Weather Signals
CREATE TABLE weather_signals (
 id uuid primary key,
 city text,
 week_start date,
 avg_temperature float,
 rainfall_mm float
);

-- Scraper Health
CREATE TABLE scraper_health (
 id uuid primary key,
 scraper text, -- google_trends/myntra/instagram
 run_at timestamptz DEFAULT now(),
 status text, -- success/warning/failed
 records_collected integer,
 error_message text
);

-- Indexes for performance
CREATE INDEX idx_transactions_store_date ON transactions(store_id, date);
CREATE INDEX idx_transactions_store_sku ON transactions(store_id, sku_id);
CREATE INDEX idx_inventory_store_health ON inventory(store_id, health_status);
CREATE INDEX idx_skus_store_review ON skus(store_id, needs_review);
CREATE INDEX idx_trend_signals_city_week ON trend_signals(city, week_start);
CREATE INDEX idx_customers_store_lapsed ON customers(store_id, lapsed);
