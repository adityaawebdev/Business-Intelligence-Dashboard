# InsightHub — Frontend Web Application

> Enterprise-grade Business Intelligence & Analytics UI built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

---

## 📌 Overview

The **InsightHub Frontend** is an enterprise dashboard for business analysts, operations managers, and executives. It features:
- **Executive Overview (`/dashboard`)**: 4 primary KPI cards, interactive Revenue Overview area chart, regional distribution bar chart, category share donut chart, top products table, customer trend charts, automated diagnostic insights, and system activity audit log.
- **Sales Analytics (`/sales`)**: Quota attainment, monthly pacing vs targets, regional velocity, and channel conversion.
- **Customer Analytics (`/customers`)**: Acquisition trends across channels, account tier segmentation, and strategic enterprise accounts.
- **Product Analytics (`/products`)**: SKU gross margin intelligence, category velocity, and product catalog matrix with category filter tabs.
- **Financial Analytics (`/financial`)**: EBITDA and margin KPIs, composed Revenue vs OPEX comparison, departmental cost allocations, and quarterly cashflow statements.
- **Operations & Logistics (`/operations`)**: Fulfillment SLA tracking (98.4%), dispatch lead times, daily throughput vs backlog, and facility incident alerts.
- **Predictive Forecasting (`/forecasting`)**: Historical ground truth transitioned into projected ML forecast runway with confidence intervals and sensitivity scenarios.
- **Dataset Ingestion (`/data-upload`)**: Drag-and-drop file upload zone for CSV, XLSX, and XLS with 50 MB limits, file selection preview, and an Ingested Datasets audit table.
- **BI Reports Manager (`/reports`)**: Report catalog with creation modal, and action buttons for View, Export, and Download.
- **Platform Settings (`/settings`)**: Tabbed configuration for User Profile, Currency & Locale, Dashboard Refresh Cadence, Notifications, and Security & RBAC.

---

## 🛠️ Tech Stack

- **React 18**: UI component library.
- **Vite 6**: Next-generation frontend build tooling and HMR dev server.
- **Tailwind CSS 3**: Utility-first CSS styling with customized enterprise brand palette.
- **React Router DOM 6**: Single-page application client routing.
- **Recharts 2**: Declarative, responsive SVG charting library.
- **Lucide React**: Clean, modern enterprise icons.
- **Axios**: HTTP client template configured with interceptors, ready for FastAPI backend connection.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Default variables:
```env
VITE_APP_NAME="InsightHub"
VITE_API_BASE_URL="http://localhost:8000/api/v1"
```

### 3. Run Development Server
```bash
npm run dev
```
Navigate to: [http://localhost:5173/](http://localhost:5173/)

### 4. Build for Production
```bash
npm run build
```
Compiled static assets are generated in `frontend/dist/`.

To preview the build:
```bash
npm run preview
```
