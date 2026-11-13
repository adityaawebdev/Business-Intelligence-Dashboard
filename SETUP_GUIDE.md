# InsightHub — Complete Setup & Execution Guide

> Step-by-step instructions for setting up the **PostgreSQL Database**, running the **Python FastAPI Backend**, and launching the **React + Vite Frontend**.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Database Setup & Schema Structure](#2-database-setup--schema-structure)
   - [PostgreSQL Database Creation](#step-21-create-postgresql-database)
   - [Database Schema Architecture (8 Tables)](#step-22-database-schema-architecture)
   - [Running Alembic Migrations](#step-23-run-alembic-migrations)
   - [Seeding Business Intelligence Data](#step-24-seed-sample-development-data)
3. [Backend Setup (FastAPI)](#3-backend-setup-fastapi)
   - [Virtual Environment Setup](#step-31-create--activate-virtual-environment)
   - [Installing Dependencies](#step-32-install-python-dependencies)
   - [Environment Configuration](#step-33-configure-backend-env)
   - [Starting the Backend Server](#step-34-start-uvicorn-server)
   - [Backend URLs & Documentation](#backend-endpoints--telemetry)
4. [Frontend Setup (React + Vite)](#4-frontend-setup-react--vite)
   - [Installing Node Modules](#step-41-install-node-dependencies)
   - [Environment Configuration](#step-42-configure-frontend-env)
   - [Starting the Development Server](#step-43-start-vite-dev-server)
   - [Frontend Routes](#frontend-views--routes)
5. [Verification & Testing](#5-verification--automated-tests)
6. [Troubleshooting & FAQs](#6-troubleshooting--faqs)

---

## 1. Prerequisites

Ensure you have the following installed on your operating system:

| Software | Minimum Version | Download Link / Command |
| :--- | :--- | :--- |
| **Node.js & npm** | `Node.js 18+` / `npm 9+` | [nodejs.org](https://nodejs.org/) |
| **Python** | `Python 3.10+` (tested on 3.14) | [python.org](https://www.python.org/) |
| **PostgreSQL** | `PostgreSQL 15, 16, 17, or 18` | [postgresql.org](https://www.postgresql.org/download/) |
| **Git** | Any modern version | [git-scm.com](https://git-scm.com/) |

---

## 2. Database Setup & Schema Structure

### Step 2.1: Create PostgreSQL Database

Make sure your local PostgreSQL service is running. Connect to PostgreSQL using `psql` (or pgAdmin / DBeaver) and create the `insighthub` database:

```sql
-- Connect via psql: psql -U postgres
CREATE DATABASE insighthub;
```

---

### Step 2.2: Database Schema Architecture

The database follows a normalized relational structure using **SQLAlchemy 2.x Declarative Base** models with exact precision for monetary amounts:

```text
                                 ┌──────────────┐
                                 │    users     │
                                 └──────┬───────┘
                                        │ 1:N
                 ┌──────────────────────┼──────────────────────┐
                 ▼                      ▼                      ▼
          ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
          │   datasets   │       │   reports    │       │ (Audit logs) │
          └──────────────┘       └──────────────┘       └──────────────┘

                                 ┌──────────────┐
                                 │  customers   │
                                 └──────┬───────┘
                                        │ 1:N
                                        ▼
          ┌──────────────┐ 1:N   ┌──────────────┐
          │   products   ├──────►│sales_trans...│
          └──────────────┘       └──────────────┘

          ┌──────────────────────┐       ┌──────────────────────┐
          │financial_transactions│       │  operations_metrics  │
          └──────────────────────┘       └──────────────────────┘
```

#### Detailed Table Specifications:

#### 1. `users`
- `id` (`Integer`, PK, autoincrement)
- `email` (`String(255)`, unique, indexed)
- `full_name` (`String(255)`)
- `hashed_password` (`String(255)`)
- `role` (`String(50)`, e.g., `'admin'`, `'analyst'`, `'viewer'`)
- `is_active` (`Boolean`, default: `True`)
- `created_at`, `updated_at` (`DateTime(timezone=True)`)

#### 2. `datasets`
- `id` (`Integer`, PK, autoincrement)
- `name` (`String(255)`, indexed)
- `original_filename` (`String(255)`)
- `file_type` (`String(20)`, e.g., `'csv'`, `'xlsx'`, `'xls'`)
- `file_size` (`BigInteger`, in bytes)
- `record_count` (`Integer`, default: `0`)
- `status` (`String(50)`, e.g., `'uploaded'`, `'processing'`, `'processed'`, `'failed'`)
- `uploaded_by` (`Integer`, FK -> `users.id`, nullable)
- `created_at`, `updated_at` (`DateTime(timezone=True)`)

#### 3. `customers`
- `id` (`Integer`, PK, autoincrement)
- `customer_code` (`String(50)`, unique, indexed)
- `name` (`String(255)`, indexed)
- `email` (`String(255)`)
- `phone` (`String(50)`)
- `company` (`String(255)`)
- `segment` (`String(50)`, e.g., `'Enterprise'`, `'Mid-Market'`, `'SMB / Growth'`, `'Starter'`)
- `region` (`String(100)`, e.g., `'West'`, `'North'`, `'South'`, `'East'`)
- `country` (`String(100)`, default: `'India'`)
- `is_active` (`Boolean`, default: `True`)
- `created_at`, `updated_at` (`DateTime(timezone=True)`)

#### 4. `products`
- `id` (`Integer`, PK, autoincrement)
- `product_code` (`String(50)`, unique, indexed)
- `name` (`String(255)`, indexed)
- `description` (`String(500)`)
- `category` (`String(100)`, indexed, e.g., `'Software'`, `'Electronics'`, `'Services'`, `'Accessories'`)
- `unit_cost` (`Numeric(12, 2)`, exact decimal cost)
- `unit_price` (`Numeric(12, 2)`, exact decimal selling price)
- `stock_quantity` (`Integer`, default: `0`)
- `is_active` (`Boolean`, default: `True`)
- `created_at`, `updated_at` (`DateTime(timezone=True)`)

#### 5. `sales_transactions`
- `id` (`Integer`, PK, autoincrement)
- `transaction_code` (`String(50)`, unique, indexed)
- `customer_id` (`Integer`, FK -> `customers.id`, indexed)
- `product_id` (`Integer`, FK -> `products.id`, indexed)
- `quantity` (`Integer`, default: `1`)
- `unit_price` (`Numeric(14, 2)`)
- `discount_rate` (`Numeric(5, 2)`, default: `0.00`)
- `net_revenue` (`Numeric(14, 2)`, indexed)
- `sales_channel` (`String(50)`, e.g., `'Direct Sales'`, `'Online Portal'`, `'Channel Partners'`, `'Inside Sales'`)
- `region` (`String(100)`, indexed)
- `sales_rep` (`String(255)`)
- `payment_method` (`String(50)`, e.g., `'Bank Wire'`, `'Credit Card'`, `'Corporate Net-30'`)
- `status` (`String(50)`, default: `'completed'`)
- `transaction_date` (`DateTime(timezone=True)`, indexed)
- `created_at`, `updated_at` (`DateTime(timezone=True)`)

#### 6. `financial_transactions`
- `id` (`Integer`, PK, autoincrement)
- `reference_code` (`String(50)`, unique, indexed)
- `transaction_type` (`String(50)`, indexed, `'revenue'` or `'expense'`)
- `category` (`String(100)`, indexed, e.g., `'Operating Expenses'`, `'Cloud Infrastructure'`)
- `department` (`String(100)`, e.g., `'R&D'`, `'Sales & Marketing'`, `'Cloud Hosting'`, `'G&A'`)
- `amount` (`Numeric(14, 2)`)
- `currency` (`String(10)`, default: `'INR'`)
- `notes` (`String(500)`)
- `transaction_date` (`DateTime(timezone=True)`, indexed)
- `created_at`, `updated_at` (`DateTime(timezone=True)`)

#### 7. `operations_metrics`
- `id` (`Integer`, PK, autoincrement)
- `facility_name` (`String(255)`, e.g., `'West Hub (Mumbai)'`, `'North Hub (NCR)'`)
- `region` (`String(100)`, indexed)
- `metric_type` (`String(100)`, indexed, e.g., `'fulfillment_sla'`, `'lead_time'`, `'defect_rate'`)
- `metric_value` (`Numeric(10, 2)`)
- `unit` (`String(20)`, e.g., `'%'`, `'hrs'`)
- `status` (`String(50)`, default: `'optimal'`)
- `recorded_at` (`DateTime(timezone=True)`, indexed)
- `created_at`, `updated_at` (`DateTime(timezone=True)`)

#### 8. `reports`
- `id` (`Integer`, PK, autoincrement)
- `name` (`String(255)`, indexed)
- `report_type` (`String(100)`, e.g., `'Executive Summary (PDF)'`, `'Financial Audit (XLSX)'`)
- `description` (`Text`)
- `status` (`String(50)`, default: `'Ready'`)
- `download_url` (`String(500)`)
- `created_by` (`Integer`, FK -> `users.id`, nullable)
- `created_at`, `updated_at` (`DateTime(timezone=True)`)

---

### Step 2.3: Run Alembic Migrations

Once your database credentials are set in `backend/.env`, run the migration to automatically generate all 8 tables, constraints, foreign keys, and indexes:

```bash
cd backend

# Apply migrations
alembic upgrade head
```

*(Optional) To view the generated SQL before running:*
```bash
alembic upgrade head --sql
```

---

### Step 2.4: Seed Sample Development Data

To populate your PostgreSQL database with realistic users, customers, catalog products, sales orders, expenses, and operations metrics:

```bash
cd backend
python -m app.database.seed
```

Output:
```text
==================================================
InsightHub Database Seeder Initialized
Database Target: insighthub
==================================================
[1/6] Users seeded: Admin, Priya Sharma, Vikram Mehta
[2/6] Customers seeded: 6 enterprise client accounts
[3/6] Products seeded: 6 SKUs across Software, Hardware & Services
[4/6] Sales Transactions seeded: 9 enterprise orders
[5/6] Financial Transactions seeded: 10 ledger entries
[6/6] Operations Metrics seeded: 5 logistics hubs
Database seeding completed successfully!
```

---

## 3. Backend Setup (FastAPI)

### Step 3.1: Create & Activate Virtual Environment

Open a terminal and navigate to `backend/`:

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate on Windows PowerShell:
.\venv\Scripts\activate

# Activate on Windows Command Prompt:
.\venv\Scripts\activate.bat

# Activate on macOS / Linux:
source venv/bin/activate
```

---

### Step 3.2: Install Python Dependencies

With your virtual environment activated, install all required packages:

```bash
pip install -r requirements.txt
```

*Installed dependencies include: `fastapi`, `uvicorn`, `pydantic`, `pydantic-settings`, `sqlalchemy>=2.0.36`, `alembic>=1.14.0`, `psycopg[binary]>=3.2.0`, `python-multipart`, `pytest`, `httpx`.*

---

### Step 3.3: Configure Backend `.env`

Create a local `.env` file from the provided template:

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Open `backend/.env` and update with your PostgreSQL password:

```ini
APP_NAME="InsightHub API"
APP_ENV=development
APP_HOST=127.0.0.1
APP_PORT=8000
API_V1_PREFIX=/api/v1

FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=["http://localhost:5173", "http://127.0.0.1:5173"]

# Set your PostgreSQL password here:
DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/insighthub
DB_POOL_SIZE=5
DB_MAX_OVERFLOW=10
DB_POOL_TIMEOUT=30
DB_ECHO=false

LOG_LEVEL=INFO
```

---

### Step 3.4: Start Uvicorn Server

Start the backend server in reload mode:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

---

### Backend Endpoints & Telemetry

| Resource | URL | Description |
| :--- | :--- | :--- |
| **Interactive Docs (Swagger)** | [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) | Test all endpoints directly in the browser |
| **Alternative Docs (ReDoc)** | [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc) | Clean API schema reference |
| **System Health Check** | [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health) | API service version & telemetry status |
| **Database Health Check** | [http://127.0.0.1:8000/api/v1/health/database](http://127.0.0.1:8000/api/v1/health/database) | PostgreSQL connectivity & connection pool metrics |
| **API Root** | [http://127.0.0.1:8000/api/v1/](http://127.0.0.1:8000/api/v1/) | Service descriptor |

---

## 4. Frontend Setup (React + Vite)

### Step 4.1: Install Node Dependencies

Open a second terminal and navigate to `frontend/`:

```bash
cd frontend

npm install
```

---

### Step 4.2: Configure Frontend `.env`

Copy the frontend environment template:

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Contents of `frontend/.env`:
```ini
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=InsightHub
VITE_APP_ENV=development
```

---

### Step 4.3: Start Vite Dev Server

```bash
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:5173/](http://localhost:5173/)**

---

### Frontend Views & Routes

| Route | View Name | Key Content |
| :--- | :--- | :--- |
| `/dashboard` | **Executive Overview** | 4 primary KPI cards (Revenue ₹24.5M, Profit ₹6.8M, Orders 12,458, AOV ₹1,967), revenue trends area chart, regional bar chart, channel donut, top products, strategic clients, diagnostic insights, system activity log. |
| `/sales` | **Sales Analytics** | Pacing vs targets, regional sales quotas, channel conversions. |
| `/customers` | **Customer Intelligence** | Acquisition channels (Organic, Paid, Referral), account tier distributions, enterprise clients. |
| `/products` | **Product Analytics** | Margin intelligence, category performance, product catalog matrix with tab filtering. |
| `/financial` | **Financial Analytics** | EBITDA margins, Revenue vs OPEX composed chart, departmental cost breakdown, cashflow statement. |
| `/operations` | **Operations & Logistics** | Fulfillment SLAs (98.4%), warehouse dispatch lead times, order intake throughput vs backlogs, alerts. |
| `/forecasting` | **Predictive Forecasting** | Historical actuals transitioning into predictive forecast runway with confidence intervals and scenarios. |
| `/data-upload` | **Dataset ETL Ingestion** | Drag-and-drop file upload zone for CSV, XLSX, XLS (50 MB limit) and ingested datasets audit table. |
| `/reports` | **BI Reports Manager** | Report catalog, report creation modal, View, Export, and Download actions. |
| `/settings` | **Platform Settings** | User profile, currency & formatting preferences, refresh cadence, alert policies, RBAC. |

---

## 5. Verification & Automated Tests

### 1. Run All Backend Tests (21 Tests)

```bash
# Windows PowerShell
$env:PYTHONPATH="backend"
.\backend\venv\Scripts\pytest.exe backend\tests -v

# macOS / Linux
PYTHONPATH=backend pytest backend/tests -v
```

Expected result:
```text
backend/tests/test_api.py::test_health_check PASSED
backend/tests/test_api.py::test_database_health_check PASSED
...
backend/tests/test_repositories.py::test_customer_repository PASSED
backend/tests/test_repositories.py::test_product_repository PASSED
backend/tests/test_repositories.py::test_sales_repository PASSED
backend/tests/test_repositories.py::test_financial_repository PASSED
backend/tests/test_repositories.py::test_operations_repository PASSED
backend/tests/test_repositories.py::test_dataset_repository_crud PASSED
backend/tests/test_repositories.py::test_report_repository_crud PASSED
======================== 21 passed in 2.17s ========================
```

---

### 2. Verify Frontend Production Build

```bash
cd frontend
npm run build
```

Expected result:
```text
vite v6.4.6 building for production...
transforming...
✓ 2037 modules transformed.
rendering chunks...
dist/index.html                   0.86 kB
dist/assets/index-BR6KMCqJ.css   31.73 kB
dist/assets/index-Cr3KqqT9.js   761.37 kB
✓ built in ~9s with 0 errors
```

---

## 6. Troubleshooting & FAQs

### Q1: On Windows PowerShell: `activate.ps1 cannot be loaded because running scripts is disabled`
**Solution**: Allow running local scripts for your current session:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\activate
```

### Q2: Backend says `Database server is unreachable or credentials are not yet configured`
**Solution**:
1. Check that PostgreSQL is running on port 5432.
2. Confirm the database exists: `CREATE DATABASE insighthub;`.
3. Check `backend/.env` has the correct password in `DATABASE_URL`.
4. *Note: InsightHub includes graceful fallbacks, so the frontend and API continue running even before database credentials are entered.*

### Q3: `npm` command not found or PowerShell script error
**Solution**:
Run using the explicit Windows command shim:
```powershell
npm.cmd install
npm.cmd run dev
```

### Q4: Will `node_modules` or `.env` get accidentally pushed to GitHub?
**Solution**:
No. The root `.gitignore` specifically excludes:
- `node_modules/` and `**/node_modules/`
- `venv/` and `**/.venv/`
- `.env` and `**/.env`
- `dist/` and `**/dist/`
- `.pytest_cache/`
Only `.env.example` templates are tracked in Git.
