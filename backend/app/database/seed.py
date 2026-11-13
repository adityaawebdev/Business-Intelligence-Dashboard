"""
Development Database Seed Script for InsightHub.
Populates realistic benchmark records with relational integrity:
Users -> Customers -> Products -> SalesTransactions -> FinancialTransactions -> OperationsMetrics -> Reports.
"""

import logging
from datetime import date, datetime, timedelta
from decimal import Decimal
from sqlalchemy.orm import Session
from app.database.connection import engine, SessionLocal
from app.database.base import Base
from app.models.user import User
from app.models.customer import Customer
from app.models.product import Product
from app.models.sales import SalesTransaction
from app.models.financial import FinancialTransaction
from app.models.operations import OperationsMetric
from app.models.report import Report
from app.models.dataset import Dataset

logger = logging.getLogger("insighthub.seed")


def seed_database(db: Session) -> None:
    logger.info("Starting development database seeding...")

    # 1. Seed Users
    if not db.query(User).first():
        users = [
            User(name="Admin User", email="admin.lead@insighthub.internal", role="admin", is_active=True),
            User(name="Priya Sharma", email="priya.sharma@insighthub.internal", role="analyst", is_active=True),
            User(name="Vikram Mehta", email="vikram.mehta@insighthub.internal", role="viewer", is_active=True),
            User(name="Aarav Patel", email="aarav.patel@insighthub.internal", role="analyst", is_active=True)
        ]
        db.add_all(users)
        db.commit()
        logger.info(f"Seeded {len(users)} users.")

    admin_user = db.query(User).filter_by(role="admin").first()

    # 2. Seed Customers
    if not db.query(Customer).first():
        customers = [
            Customer(customer_code="CUST-101", name="Apex Global Logistics Pvt Ltd", email="procurement@apexlogistics.in", phone="+91 22 4567 8901", region="West", segment="Enterprise", registration_date=date(2025, 1, 15), status="Active"),
            Customer(customer_code="CUST-102", name="Zenith FinTech Systems", email="billing@zenithfintech.com", phone="+91 80 2345 6789", region="South", segment="Enterprise", registration_date=date(2025, 2, 20), status="Active"),
            Customer(customer_code="CUST-103", name="Nexus Telecommunications Ltd", email="infra@nexustelecom.in", phone="+91 11 3456 7890", region="North", segment="Mid-Market", registration_date=date(2025, 3, 10), status="Active"),
            Customer(customer_code="CUST-104", name="Infinitum Retail India", email="accounts@infinitumretail.com", phone="+91 33 4567 1234", region="East", segment="Strategic", registration_date=date(2025, 4, 5), status="Active"),
            Customer(customer_code="CUST-105", name="Quantum Health Networks", email="tech@quantumhealth.org", phone="+91 712 234 5678", region="Central", segment="Mid-Market", registration_date=date(2025, 5, 18), status="Active"),
            Customer(customer_code="CUST-106", name="Starlight Digital Labs", email="ops@starlightdigital.io", phone="+91 40 5678 9012", region="South", segment="SMB", registration_date=date(2025, 6, 22), status="Active")
        ]
        db.add_all(customers)
        db.commit()
        logger.info(f"Seeded {len(customers)} customers.")

    # 3. Seed Products
    if not db.query(Product).first():
        products = [
            Product(product_code="SKU-001", name="Enterprise Cloud Suite Pro", category="Software", description="Complete cloud license subscription for enterprise teams", unit_cost=Decimal("3360.00"), unit_price=Decimal("12000.00"), status="High"),
            Product(product_code="SKU-002", name="SmartEdge Server Gateway v2", category="Electronics", description="High-performance industrial IoT server gateway", unit_cost=Decimal("10800.00"), unit_price=Decimal("20000.00"), status="High"),
            Product(product_code="SKU-003", name="Annual Managed DevOps Support", category="Services", description="Dedicated SRE and platform reliability contract", unit_cost=Decimal("10500.00"), unit_price=Decimal("25000.00"), status="Stable"),
            Product(product_code="SKU-004", name="Industrial IoT Sensor Pack", category="Electronics", description="Multi-sensor environmental and power telemetry package", unit_cost=Decimal("2480.00"), unit_price=Decimal("4000.00"), status="Stable"),
            Product(product_code="SKU-005", name="Unified Analytics AI Add-on", category="Software", description="Real-time automated diagnostic predictions module", unit_cost=Decimal("760.00"), unit_price=Decimal("4000.00"), status="High"),
            Product(product_code="SKU-006", name="High-Density Rack Mount Accessories", category="Accessories", description="Hardware mount kits for enterprise rack chassis", unit_cost=Decimal("1065.00"), unit_price=Decimal("1500.00"), status="Low")
        ]
        db.add_all(products)
        db.commit()
        logger.info(f"Seeded {len(products)} products.")

    # 4. Seed Sales Transactions (With relational integrity)
    if not db.query(SalesTransaction).first():
        all_customers = db.query(Customer).all()
        all_products = db.query(Product).all()

        sales_data = [
            # order, cust_idx, prod_idx, qty, region, tx_date
            ("ORD-2026-1001", 0, 0, 15, "West", date(2026, 10, 5)),
            ("ORD-2026-1002", 1, 1, 8, "South", date(2026, 10, 12)),
            ("ORD-2026-1003", 2, 2, 4, "North", date(2026, 10, 18)),
            ("ORD-2026-1004", 3, 3, 25, "East", date(2026, 10, 24)),
            ("ORD-2026-1005", 4, 4, 20, "Central", date(2026, 10, 29)),
            ("ORD-2026-1006", 0, 4, 30, "West", date(2026, 11, 2)),
            ("ORD-2026-1007", 1, 0, 20, "South", date(2026, 11, 5)),
            ("ORD-2026-1008", 2, 1, 12, "North", date(2026, 11, 8)),
            ("ORD-2026-1009", 5, 5, 50, "South", date(2026, 11, 10))
        ]

        sales = []
        for order_no, c_idx, p_idx, qty, region, tx_date in sales_data:
            cust = all_customers[c_idx]
            prod = all_products[p_idx]
            rev = prod.unit_price * Decimal(qty)
            cost = prod.unit_cost * Decimal(qty)
            profit = rev - cost
            sales.append(SalesTransaction(
                transaction_date=tx_date,
                order_number=order_no,
                customer_id=cust.id,
                product_id=prod.id,
                region=region,
                quantity=qty,
                unit_price=prod.unit_price,
                revenue=rev,
                cost=cost,
                profit=profit
            ))

        db.add_all(sales)
        db.commit()
        logger.info(f"Seeded {len(sales)} sales transactions.")

    # 5. Seed Financial Transactions
    if not db.query(FinancialTransaction).first():
        financials = [
            FinancialTransaction(transaction_date=date(2026, 10, 1), transaction_type="revenue", category="Software Subscriptions", description="Q4 SaaS ARR Collections", amount=Decimal("12500000.00"), region="West"),
            FinancialTransaction(transaction_date=date(2026, 10, 1), transaction_type="expense", category="R&D / Product Engineering", description="Cloud engineering payroll & tooling", amount=Decimal("8500000.00"), region="National"),
            FinancialTransaction(transaction_date=date(2026, 10, 15), transaction_type="expense", category="Sales & Marketing", description="Enterprise growth campaigns", amount=Decimal("6800000.00"), region="West"),
            FinancialTransaction(transaction_date=date(2026, 10, 20), transaction_type="expense", category="Cloud Infrastructure & Hosting", description="AWS & GCP cloud server clusters", amount=Decimal("3950000.00"), region="National"),
            FinancialTransaction(transaction_date=date(2026, 11, 1), transaction_type="revenue", category="Hardware & Edge Gateways", description="Bulk industrial edge dispatches", amount=Decimal("9400000.00"), region="North")
        ]
        db.add_all(financials)
        db.commit()
        logger.info(f"Seeded {len(financials)} financial transactions.")

    # 6. Seed Operations Metrics
    if not db.query(OperationsMetric).first():
        ops = [
            OperationsMetric(metric_date=date(2026, 11, 1), region="West", metric_name="fulfillment_sla_pct", metric_value=Decimal("99.10"), status="Optimal"),
            OperationsMetric(metric_date=date(2026, 11, 1), region="North", metric_name="fulfillment_sla_pct", metric_value=Decimal("98.50"), status="Optimal"),
            OperationsMetric(metric_date=date(2026, 11, 1), region="South", metric_name="fulfillment_sla_pct", metric_value=Decimal("98.80"), status="Optimal"),
            OperationsMetric(metric_date=date(2026, 11, 1), region="East", metric_name="fulfillment_sla_pct", metric_value=Decimal("96.20"), status="Attention"),
            OperationsMetric(metric_date=date(2026, 11, 1), region="Central", metric_name="fulfillment_sla_pct", metric_value=Decimal("97.40"), status="Optimal")
        ]
        db.add_all(ops)
        db.commit()
        logger.info(f"Seeded {len(ops)} operations telemetry metrics.")

    # 7. Seed Datasets & Reports
    if not db.query(Dataset).first():
        datasets = [
            Dataset(name="Q4_Consolidated_Sales_v3.csv", original_filename="Q4_Consolidated_Sales_v3.csv", file_type="csv", file_size=14889728, record_count=42500, status="processed", uploaded_by=admin_user.id if admin_user else None),
            Dataset(name="Enterprise_Customer_Churn_Analysis.xlsx", original_filename="Enterprise_Customer_Churn_Analysis.xlsx", file_type="xlsx", file_size=9122611, record_count=18240, status="processed", uploaded_by=admin_user.id if admin_user else None)
        ]
        db.add_all(datasets)
        db.commit()
        logger.info(f"Seeded {len(datasets)} datasets.")

    if not db.query(Report).first():
        reports = [
            Report(name="Executive Board Performance Briefing", report_type="Executive Summary (PDF)", description="Comprehensive executive summary of quarterly business performance", status="Ready", created_by=admin_user.id if admin_user else None),
            Report(name="Consolidated P&L & Regional EBITDA Analysis", report_type="Financial Audit (XLSX)", description="Complete quarterly P&L reconciliation across domestic zones", status="Ready", created_by=admin_user.id if admin_user else None)
        ]
        db.add_all(reports)
        db.commit()
        logger.info(f"Seeded {len(reports)} reports.")

    logger.info("Database seeding successfully completed!")


if __name__ == "__main__":
    logging.basicConfig(level="INFO")
    with SessionLocal() as session:
        seed_database(session)
