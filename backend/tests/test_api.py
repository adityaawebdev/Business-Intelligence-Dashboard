import io
import pytest


def test_health_check(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert json_data["data"]["status"] == "healthy"
    assert json_data["data"]["service"] == "InsightHub API"
    assert json_data["data"]["version"] == "1.0.0"


def test_database_health_check(client):
    response = client.get("/api/v1/health/database")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert "status" in data
    assert data["status"] in ("healthy", "unreachable")
    assert "connected" in data
    assert isinstance(data["connected"], bool)
    assert data["database"] == "insighthub"
    assert data["engine"] == "PostgreSQL (psycopg3)"


def test_api_root(client):
    response = client.get("/api/v1/")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["application"] == "InsightHub"
    assert json_data["version"] == "1.0.0"
    assert json_data["status"] == "running"


def test_dashboard_overview(client):
    response = client.get("/api/v1/dashboard/overview")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert "kpis" in data
    assert len(data["kpis"]) == 4
    assert "revenueTrend" in data
    assert "salesByRegion" in data
    assert "salesByCategory" in data
    assert "topProducts" in data
    assert "topCustomers" in data
    assert "businessInsights" in data
    assert "recentActivity" in data


def test_sales_summary(client):
    response = client.get("/api/v1/sales/summary")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert data["revenue"] == "₹28.4M"
    assert data["orders"] == 14210
    assert data["growthRate"] == 15.4


def test_sales_trends(client):
    response = client.get("/api/v1/sales/trends")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert len(json_data["data"]) == 12


def test_customers_summary(client):
    response = client.get("/api/v1/customers/summary")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert data["totalCustomers"] == 4892
    assert data["newCustomers"] == 642


def test_products_summary(client):
    response = client.get("/api/v1/products/summary")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert data["totalProducts"] == 148
    assert "bestPerformingProduct" in data


def test_financial_summary(client):
    response = client.get("/api/v1/financial/summary")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert data["revenue"] == "₹32.4M"
    assert data["grossMarginPct"] == 64.8


def test_operations_summary(client):
    response = client.get("/api/v1/operations/summary")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert data["fulfillmentSlaPct"] == 98.4
    assert data["avgLeadTimeHrs"] == 4.2


def test_forecasting_summary(client):
    response = client.get("/api/v1/forecasting/summary")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert data["forecastedRevenue"] == "₹22.8M"
    assert data["forecastAccuracyPct"] == 94.6


def test_upload_dataset_valid_csv(client):
    csv_content = b"region,sales,orders\nNorth,500000,120\nSouth,420000,98\n"
    files = {"file": ("test_sales_data.csv", io.BytesIO(csv_content), "text/csv")}
    response = client.post("/api/v1/uploads/dataset", files=files)
    assert response.status_code == 201
    json_data = response.json()
    assert json_data["success"] is True
    assert json_data["data"]["filename"] == "test_sales_data.csv"
    assert json_data["data"]["fileType"] == "csv"
    assert json_data["data"]["status"] == "uploaded"


def test_upload_dataset_invalid_extension(client):
    bad_content = b"fake binary executable content"
    files = {"file": ("malicious_script.exe", io.BytesIO(bad_content), "application/octet-stream")}
    response = client.post("/api/v1/uploads/dataset", files=files)
    assert response.status_code == 400
    json_data = response.json()
    assert json_data["success"] is False
    assert "Unsupported file type" in json_data["message"]


def test_reports_crud(client):
    # Test GET list
    list_response = client.get("/api/v1/reports")
    assert list_response.status_code == 200
    list_data = list_response.json()
    assert list_data["success"] is True
    assert len(list_data["data"]) >= 1

    # Test GET single valid
    single_response = client.get("/api/v1/reports/rep-001")
    assert single_response.status_code == 200
    assert single_response.json()["data"]["id"] == "rep-001"

    # Test GET invalid 404
    not_found_response = client.get("/api/v1/reports/non-existent-id")
    assert not_found_response.status_code == 404
    assert not_found_response.json()["success"] is False

    # Test POST create report
    payload = {
        "name": "Q4 Performance Test Report",
        "type": "Executive Summary (PDF)",
        "frequency": "Ad-hoc"
    }
    create_response = client.post("/api/v1/reports", json=payload)
    assert create_response.status_code == 201
    created_data = create_response.json()
    assert created_data["success"] is True
    assert created_data["data"]["name"] == "Q4 Performance Test Report"
