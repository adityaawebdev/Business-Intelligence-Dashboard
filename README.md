# InsightHub — Business Intelligence & Analytics Platform

> An enterprise-grade Business Intelligence (BI) and product analytics platform built with a **React + Vite** frontend, a modular **Python FastAPI** backend service, and a **PostgreSQL** relational database layer with **SQLAlchemy 2.x** and **Alembic**.

📖 **Looking for a complete step-by-step setup guide? See [SETUP_GUIDE.md](file:///c:/Rikhav%20Ultra%20projects/Business_intelligence%20dashboard/SETUP_GUIDE.md)** for detailed PostgreSQL creation, schema definitions, Alembic migrations, database seeding, and frontend/backend startup commands.

---

## 📌 Repository Architecture

The project is structured into two clean, self-contained directories: **`frontend/`** and **`backend/`**.

```text
Business_intelligence dashboard/
│
├── frontend/                        # React SPA Web Application
│   ├── src/                         # Components, pages, mock data & context
│   ├── public/                      # Static assets (favicons, SVG icons)
│   ├── package.json                 # Node dependencies & build scripts
│   ├── vite.config.js               # Vite bundler & dev server config
│   ├── tailwind.config.js           # Tailwind CSS enterprise styling
│   ├── postcss.config.js            # PostCSS configuration
│   ├── .env.example                 # Frontend environment template
│   ├── .env                         # Local frontend environment variables
│   ├── .gitignore                   # Ignores node_modules/, dist/, .env
│   └── README.md                    # Dedicated frontend guide
│
├── backend/                         # Python FastAPI REST Backend & Database Service
│   ├── alembic/                     # Alembic migration revisions & env.py
│   ├── app/
│   │   ├── api/                     # FastAPI route controllers (/api/v1/)
│   │   ├── database/                # Engine, base, dependencies & seeder
│   │   ├── models/                  # SQLAlchemy 2.x Declarative Models
│   │   ├── repositories/            # Repository pattern (isolated SQL queries)
│   │   ├── schemas/                 # Pydantic v2 schemas
│   │   ├── services/                # Business logic services
│   │   ├── core/                    # Settings & security
│   │   └── utils/                   # Standardized response envelopes
│   ├── tests/                       # Pytest automated test suite (21 tests)
│   ├── requirements.txt             # Python dependencies (FastAPI, SQLAlchemy, Psycopg)
│   ├── alembic.ini                  # Alembic CLI migration configuration
│   ├── .env.example                 # Backend environment template
│   ├── .env                         # Local backend environment variables
│   ├── .gitignore                   # Ignores venv/, __pycache__/, .env
│   └── README.md                    # Dedicated backend guide
│
├── .gitignore                       # Master root gitignore (protects all node_modules, venvs, dist)
├── .env.example                     # Full-stack environment template
└── README.md                        # Master project documentation
```

---

## 🛡️ Git & GitHub Protection

The root `.gitignore` and folder-level `.gitignore` files ensure that when you initialize Git and push to GitHub:
- **`node_modules/`** is completely ignored and will **never** be pushed.
- **`dist/`** build output directories are ignored.
- **`venv/`** and Python virtual environments are ignored.
- **`__pycache__/`** and `.pytest_cache/` are ignored.
- **`.env`** private local files are ignored (`.env.example` templates are provided instead).

---

## 🚀 Quick Start Guide

### 1. Database Setup (PostgreSQL)

Ensure PostgreSQL 16, 17, or 18 is running locally.

1. Create the `insighthub` database:
   ```sql
   CREATE DATABASE insighthub;
   ```
2. Configure credentials in `backend/.env`:
   ```ini
   DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/insighthub
   ```

---

### 2. Run the Backend (Python FastAPI)

In a terminal, navigate into `backend/`:

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS / Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Seed initial business intelligence data
python -m app.database.seed

# Start backend server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

- **Interactive API Docs (Swagger)**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc Documentation**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **System Health Check**: [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health)
- **Database Health Check**: [http://127.0.0.1:8000/api/v1/health/database](http://127.0.0.1:8000/api/v1/health/database)

---

### 3. Run the Frontend (React + Vite)

In a second terminal, navigate into `frontend/`:

```bash
cd frontend

# Install npm packages
npm install

# Start development server
npm run dev
```

- **Web Application**: [http://localhost:5173/](http://localhost:5173/)

---

## 🧭 Application Modules & Routes

| Route | View Name | Key Capabilities |
| :--- | :--- | :--- |
| `/dashboard` | **Executive Overview** | 4 KPI Cards, Revenue & Profit Area Chart, Regional Bar Chart, Category Donut, Top Products, Strategic Customers, Automated Insights, System Activity Audit. |
| `/sales` | **Sales Analytics** | Pacing vs targets, regional quotas, acquisition channel conversion metrics. |
| `/customers` | **Customer Intelligence** | Retention cohorts, multi-source acquisition trends (Organic, Paid, Referral), segment breakdown. |
| `/products` | **Product Analytics** | Margin intelligence, category velocity, full product catalog matrix with category filter tabs. |
| `/financial` | **Financial Analytics** | EBITDA margins, Revenue vs OPEX composed chart, departmental cost breakdown, cashflow statement. |
| `/operations` | **Operations & Logistics** | Fulfillment SLAs (98.4%), lead time metrics, daily throughput vs backlog, hub incident alerts. |
| `/forecasting` | **Predictive Forecasting** | Historical ground truth transitioned into ML forecast runway with confidence intervals & scenarios. |
| `/data-upload` | **Dataset ETL Ingestion** | Drag-and-drop file upload zone for CSV, XLSX, XLS with 50 MB limits & recent datasets audit table. |
| `/reports` | **BI Reports Manager** | Reports registry, modal for generating reports, export and download actions. |
| `/settings` | **Platform Settings** | User profile, currency and formatting preferences, dashboard refresh cadence, alert policies, RBAC. |

---

## 🧪 Running Automated Tests

### Backend Tests (Pytest — 21 Tests)
```bash
# Windows
$env:PYTHONPATH="backend"
.\backend\venv\Scripts\pytest.exe backend\tests -v

# macOS / Linux
PYTHONPATH=backend pytest backend/tests -v
```

### Frontend Production Build Verification
```bash
cd frontend
npm run build
```
