import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from app.database.base import Base
from app.database.seed import seed_database
from app.repositories.customer_repository import CustomerRepository
from app.repositories.dataset_repository import DatasetRepository
from app.repositories.financial_repository import FinancialRepository
from app.repositories.operations_repository import OperationsRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.report_repository import ReportRepository
from app.repositories.sales_repository import SalesRepository


@pytest.fixture(scope="function")
def db_session():
    """Provides a fresh, isolated in-memory SQLite database session seeded with test data."""
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = Session(engine)
    seed_database(session)
    try:
        yield session
    finally:
        session.close()


def test_customer_repository(db_session):
    summary = CustomerRepository.get_customer_summary(db_session)
    assert summary["totalCustomers"] >= 6
    assert "newCustomers" in summary

    top_customers = CustomerRepository.get_top_customers(db_session)
    assert len(top_customers) >= 1
    assert "revenue" in top_customers[0]

    segments = CustomerRepository.get_customer_segments(db_session)
    assert len(segments) >= 1


def test_product_repository(db_session):
    summary = ProductRepository.get_product_summary(db_session)
    assert summary["totalProducts"] >= 6

    products = ProductRepository.list_products(db_session)
    assert len(products) >= 6

    categories = ProductRepository.get_product_categories(db_session)
    assert len(categories) >= 1

    performance = ProductRepository.get_category_performance(db_session)
    assert len(performance) >= 1


def test_sales_repository(db_session):
    summary = SalesRepository.get_sales_summary(db_session)
    assert summary["orders"] >= 1
    assert summary["rawRevenue"] > 0

    trends = SalesRepository.get_sales_trends(db_session)
    assert len(trends) == 12

    regions = SalesRepository.get_sales_by_region(db_session)
    assert len(regions) >= 1

    categories = SalesRepository.get_sales_by_category(db_session)
    assert len(categories) >= 1


def test_financial_repository(db_session):
    summary = FinancialRepository.get_financial_summary(db_session)
    assert summary["rawRevenue"] > 0
    assert summary["rawExpenses"] > 0

    trends = FinancialRepository.get_financial_trends(db_session)
    assert len(trends) == 12

    expenses = FinancialRepository.get_expense_breakdown(db_session)
    assert len(expenses) >= 1


def test_operations_repository(db_session):
    summary = OperationsRepository.get_operations_summary(db_session)
    assert "fulfillmentSlaPct" in summary

    performance = OperationsRepository.get_regional_performance(db_session)
    assert len(performance) >= 1

    alerts = OperationsRepository.get_operations_alerts(db_session)
    assert len(alerts) >= 1

    trends = OperationsRepository.get_operations_trends(db_session)
    assert len(trends) >= 1


def test_dataset_repository_crud(db_session):
    created = DatasetRepository.create_dataset(
        db=db_session,
        name="test_pipeline_input.csv",
        original_filename="test_pipeline_input.csv",
        file_type="csv",
        file_size=2048,
        record_count=100,
        status="uploaded"
    )
    assert created.id is not None
    assert created.name == "test_pipeline_input.csv"

    fetched = DatasetRepository.get_dataset(db_session, created.id)
    assert fetched is not None
    assert fetched.file_size == 2048

    updated = DatasetRepository.update_dataset_status(db_session, created.id, "processed")
    assert updated.status == "processed"

    all_datasets = DatasetRepository.list_datasets(db_session)
    assert len(all_datasets) >= 3


def test_report_repository_crud(db_session):
    created = ReportRepository.create_report(
        db=db_session,
        name="Audited Q4 Financial Report",
        report_type="Executive Summary (PDF)",
        description="End of year audit"
    )
    assert created.id is not None
    assert created.name == "Audited Q4 Financial Report"

    fetched = ReportRepository.get_report(db_session, created.id)
    assert fetched is not None
    assert fetched.report_type == "Executive Summary (PDF)"

    reports = ReportRepository.list_reports(db_session)
    assert len(reports) >= 3
