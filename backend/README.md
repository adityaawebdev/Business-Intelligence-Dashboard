# InsightHub — FastAPI Backend & PostgreSQL Database Service

> High-performance, modular FastAPI backend service and PostgreSQL relational database layer for the **InsightHub — Business Intelligence & Analytics Platform**.

---

## 1. What InsightHub Is

**InsightHub** is an enterprise-grade Business Intelligence platform engineered for operational executives, product managers, and data analysts. 

The backend provides:
- A clean, decoupled REST API layer built with **FastAPI** and **Pydantic v2**.
- A relational database layer powered by **PostgreSQL**, **SQLAlchemy 2.x Declarative Base**, **Alembic** migrations, and **Psycopg 3**.
- A dedicated **Repository Pattern** layer isolating all SQL queries and aggregations away from route controllers.
- Complete domain modeling for Users, Datasets, Customers, Products, Sales Transactions, Financial Ledgers, Operations SLAs, and BI Reports.
- Graceful fallbacks ensuring all API endpoints remain accessible even before database provisioning.

---

## 2. Architecture & Request Lifecycle

```text
React Frontend (Vite)
       │
       ▼ (HTTP / JSON via /api/v1/...)
FastAPI Route Controllers (app/api/)
       │
       ▼ (Passes Session via get_optional_db)
Domain Services (app/services/)
       │
       ▼ (Business Logic & Orchestration)
Repository Layer (app/repositories/)
       │
       ▼ (SQLAlchemy 2.x Select/Aggregate Queries)
PostgreSQL Relational Database (insighthub)
```

---

## 3. Technology Stack

- **Python**: `3.10+` (compatible with Python `3.14`)
- **FastAPI**: Modern, high-performance web framework for APIs.
- **Uvicorn**: High-throughput ASGI server.
- **SQLAlchemy 2.x**: Modern DeclarativeBase ORM with typed relationships.
- **Alembic**: Database migrations and versioned DDL revision management.
- **Psycopg 3 (`psycopg[binary]`)**: Next-generation PostgreSQL database adapter.
- **Pydantic v2 & Pydantic-Settings**: Environment parsing and response schema validation.
- **Pytest & HTTPX**: Comprehensive testing suite with 21 unit & integration tests.

---

## 4. Backend Project Structure

```text
backend/
├── alembic/                         # Alembic migration environment
│   ├── versions/
│   │   └── 001_initial_tables.py    # Initial DDL migration for 8 tables
│   ├── env.py                       # Dynamic connection & Base.metadata binding
│   └── script.py.mako
│
├── app/
│   ├── main.py                      # FastAPI bootstrap, CORS, middlewares & health checks
│   │
│   ├── api/                         # API route controllers (/api/v1/)
│   │   ├── __init__.py              # Central API router aggregator
│   │   ├── dashboard.py             # /api/v1/dashboard/overview
│   │   ├── sales.py                 # /api/v1/sales/*
│   │   ├── customers.py             # /api/v1/customers/*
│   │   ├── products.py              # /api/v1/products/*
│   │   ├── financial.py             # /api/v1/financial/*
│   │   ├── operations.py            # /api/v1/operations/*
│   │   ├── forecasting.py           # /api/v1/forecasting/*
│   │   ├── uploads.py               # /api/v1/uploads/*
│   │   └── reports.py               # /api/v1/reports/*
│   │
│   ├── database/                    # Database engine & session lifecycle
│   │   ├── base.py                  # Base(DeclarativeBase) & TimestampMixin
│   │   ├── connection.py            # create_engine, SessionLocal, is_database_connected()
│   │   ├── dependencies.py          # get_db() & get_optional_db()
│   │   └── seed.py                  # Development database seeder
│   │
│   ├── models/                      # SQLAlchemy 2.x Declarative Models
│   │   ├── __init__.py              # Models package export
│   │   ├── user.py                  # User (roles: admin, analyst, viewer)
│   │   ├── dataset.py               # Dataset (status: uploaded, processing, processed, failed)
│   │   ├── customer.py              # Customer (segments, contact info)
│   │   ├── product.py               # Product (Numeric pricing, cost, category)
│   │   ├── sales.py                 # SalesTransaction (Numeric revenue, discounts)
│   │   ├── financial.py             # FinancialTransaction (Ledgers, revenue/expenses)
│   │   ├── operations.py            # OperationsMetric (Fulfillment, SLAs, hubs)
│   │   └── report.py                # Report (Metadata, scheduled dispatches)
│   │
│   ├── repositories/                # Repository Layer (Abstracts SQL queries)
│   │   ├── customer_repository.py   # Customer aggregations & segmentations
│   │   ├── dataset_repository.py    # Dataset CRUD operations
│   │   ├── financial_repository.py  # Financial ledger totals & expense breakdowns
│   │   ├── operations_repository.py # SLA metrics & warehouse telemetry
│   │   ├── product_repository.py    # Catalog listings & margin calculations
│   │   ├── report_repository.py     # Report queries & generation records
│   │   └── sales_repository.py      # Sales KPIs, monthly trends, regional splits
│   │
│   ├── schemas/                     # Pydantic v2 Request/Response validation
│   ├── services/                    # Business Logic Layer
│   ├── core/                        # Configuration settings
│   └── utils/                       # Standardized APIResponse envelope
│
├── tests/                           # Automated Pytest Suite
│   ├── conftest.py                  # TestClient fixtures
│   ├── test_api.py                  # End-to-end API tests (14 tests)
│   └── test_repositories.py         # SQLAlchemy models & repository tests (7 tests)
│
├── alembic.ini                      # Alembic CLI configuration
├── requirements.txt                 # Dependencies
├── .env.example                     # Environment template
└── README.md                        # Documentation
```

---

## 5. Quick Start & Setup

### Step 1: Create and Activate Virtual Environment

```bash
cd backend

# Windows PowerShell
python -m venv venv
.\venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Update `DATABASE_URL` in `.env` with your PostgreSQL credentials:

```ini
DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/insighthub
```

---

## 6. Database Migrations & Seeding

### 1. Create the PostgreSQL Database
Ensure PostgreSQL is running locally, then create the `insighthub` database:

```sql
CREATE DATABASE insighthub;
```

### 2. Run Alembic Migrations
Apply versioned migrations to generate all 8 tables and indexes:

```bash
alembic upgrade head
```

To preview the generated SQL without applying it:
```bash
alembic upgrade head --sql
```

### 3. Seed Development Data
Populate the database with realistic business intelligence seed data (customers, products, sales transactions, financial ledgers, operations telemetry):

```bash
python -m app.database.seed
```

---

## 7. Running the Application

### Start the Uvicorn Server:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Interactive Documentation & Health Checks:
- **Interactive OpenAPI (Swagger)**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc Documentation**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **System Health Check**: [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health)
- **Database Health Check**: [http://127.0.0.1:8000/api/v1/health/database](http://127.0.0.1:8000/api/v1/health/database)

---

## 8. API Endpoints Reference

All endpoints return a standardized JSON envelope:
```json
{
  "success": true,
  "data": { ... },
  "message": "Description of outcome"
}
```

### System & Health
- `GET /api/v1/health` — Application health check.
- `GET /api/v1/health/database` — PostgreSQL connection status, pool metrics, and database engine info.
- `GET /api/v1/` — Service descriptor.

### Dashboard & Analytics
- `GET /api/v1/dashboard/overview` — Consolidated executive overview with real-time KPI metrics.
- `GET /api/v1/sales/summary` — Headline revenue, quota attainments, and sales orders.
- `GET /api/v1/sales/trends` — Monthly sales trends vs previous year and target.
- `GET /api/v1/sales/by-region` — Regional sales velocity and rep performance.
- `GET /api/v1/sales/by-category` — Acquisition channel conversions and deal counts.
- `GET /api/v1/sales/top-products` — High-margin SKU sales performance.
- `GET /api/v1/customers/summary` — Active customer volume and retention rates.
- `GET /api/v1/customers/trends` — Organic vs Paid customer acquisition.
- `GET /api/v1/customers/top` — Strategic enterprise account rankings.
- `GET /api/v1/customers/segments` — Account distribution across tiers.
- `GET /api/v1/products/summary` — Catalog counts, best-performing SKU.
- `GET /api/v1/products/performance` — Category revenue and margin percentages.
- `GET /api/v1/products/categories` — Product category breakdown.
- `GET /api/v1/products/list` — Full product catalog with pricing and inventory.
- `GET /api/v1/financial/summary` — Headline revenue, operating expenses, EBITDA.
- `GET /api/v1/financial/trends` — Monthly revenue vs OPEX pacing.
- `GET /api/v1/financial/expenses` — Departmental OPEX allocations.
- `GET /api/v1/financial/profitability` — Cash flow statements and working capital.
- `GET /api/v1/operations/summary` — Fulfillment SLA, dispatch lead times.
- `GET /api/v1/operations/performance` — Warehouse hub telemetry.
- `GET /api/v1/operations/alerts` — Real-time operational incident alerts.
- `GET /api/v1/operations/trends` — Order intake throughput vs backlogs.
- `GET /api/v1/forecasting/summary` — Forecasted revenue and model confidence.
- `GET /api/v1/forecasting/trends` — Predictive forecast trajectories.
- `POST /api/v1/uploads/dataset` — Ingest CSV, XLSX, and XLS datasets.
- `GET /api/v1/uploads/datasets` — List ingested datasets and processing statuses.
- `GET /api/v1/reports` — List generated BI reports.
- `GET /api/v1/reports/{report_id}` — Get single report details.
- `POST /api/v1/reports` — Register/trigger a new report generation job.

---

## 9. Running Automated Tests

Run the complete test suite (21 tests across API endpoints and Database Repositories):

```bash
# Windows
$env:PYTHONPATH="backend"
pytest backend/tests -v

# macOS / Linux
PYTHONPATH=backend pytest backend/tests -v
```
