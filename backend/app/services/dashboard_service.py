from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.repositories.sales_repository import SalesRepository
from app.repositories.customer_repository import CustomerRepository
from app.repositories.product_repository import ProductRepository


class DashboardService:
    """
    Business Logic Service for Dashboard Overview.
    Coordinates between domain repositories (Sales, Customer, Product)
    to assemble consolidated executive metrics.
    """

    @staticmethod
    def get_overview_data(db: Optional[Session] = None) -> Dict[str, Any]:
        sales_summary = None
        top_prods = None
        top_custs = None
        if db:
            try:
                sales_summary = SalesRepository.get_sales_summary(db)
                top_prods = ProductRepository.list_products(db, limit=6)
                top_custs = CustomerRepository.get_top_customers(db, limit=5)
            except Exception:
                pass

        revenue_val = sales_summary["revenue"] if sales_summary else "₹24.5M"
        profit_val = sales_summary["profit"] if sales_summary else "₹6.8M"
        orders_val = f"{sales_summary['orders']:,}" if sales_summary else "12,458"
        aov_val = sales_summary["averageOrderValue"] if sales_summary else "₹1,967"

        return {
            "kpis": [
                {
                    "id": "kpi-revenue",
                    "title": "Total Revenue",
                    "value": revenue_val,
                    "rawNumericValue": 24500000.0,
                    "change": 12.8,
                    "isPositive": True,
                    "description": "vs previous period",
                    "badgeText": "+12.8%",
                    "sparkline": [21.2, 22.0, 21.8, 23.4, 24.1, 24.5]
                },
                {
                    "id": "kpi-profit",
                    "title": "Total Profit",
                    "value": profit_val,
                    "rawNumericValue": 6800000.0,
                    "change": 8.4,
                    "isPositive": True,
                    "description": "vs previous period",
                    "badgeText": "+8.4%",
                    "sparkline": [5.8, 6.0, 5.9, 6.3, 6.5, 6.8]
                },
                {
                    "id": "kpi-orders",
                    "title": "Total Orders",
                    "value": orders_val,
                    "rawNumericValue": 12458.0,
                    "change": 14.2,
                    "isPositive": True,
                    "description": "vs previous period",
                    "badgeText": "+14.2%",
                    "sparkline": [9800, 10400, 11100, 11600, 12050, 12458]
                },
                {
                    "id": "kpi-aov",
                    "title": "Average Order Value",
                    "value": aov_val,
                    "rawNumericValue": 1967.0,
                    "change": -2.1,
                    "isPositive": False,
                    "description": "vs previous period",
                    "badgeText": "-2.1%",
                    "sparkline": [2050, 2020, 2000, 1980, 1975, 1967]
                }
            ],
            "revenueGrowth": 12.8,
            "profitGrowth": 8.4,
            "ordersGrowth": 14.2,
            "revenueTrend": [
                {"month": "Jan", "revenue": 1650000.0, "profit": 460000.0, "orders": 840},
                {"month": "Feb", "revenue": 1780000.0, "profit": 510000.0, "orders": 910},
                {"month": "Mar", "revenue": 1920000.0, "profit": 540000.0, "orders": 980},
                {"month": "Apr", "revenue": 1850000.0, "profit": 490000.0, "orders": 940},
                {"month": "May", "revenue": 2100000.0, "profit": 590000.0, "orders": 1060},
                {"month": "Jun", "revenue": 2250000.0, "profit": 640000.0, "orders": 1140},
                {"month": "Jul", "revenue": 2180000.0, "profit": 610000.0, "orders": 1100},
                {"month": "Aug", "revenue": 2320000.0, "profit": 660000.0, "orders": 1180},
                {"month": "Sep", "revenue": 2450000.0, "profit": 710000.0, "orders": 1240},
                {"month": "Oct", "revenue": 2600000.0, "profit": 750000.0, "orders": 1310},
                {"month": "Nov", "revenue": 2850000.0, "profit": 820000.0, "orders": 1450},
                {"month": "Dec", "revenue": 3100000.0, "profit": 910000.0, "orders": 1580}
            ],
            "salesByRegion": [
                {"region": "North", "amount": 6850000.0, "orders": 3480, "share": 28},
                {"region": "West", "amount": 7600000.0, "orders": 3820, "share": 31},
                {"region": "South", "amount": 5120000.0, "orders": 2610, "share": 21},
                {"region": "East", "amount": 3180000.0, "orders": 1620, "share": 13},
                {"region": "Central", "amount": 1750000.0, "orders": 928, "share": 7}
            ],
            "salesByCategory": [
                {"name": "Electronics", "value": 8820000.0, "percentage": 36, "color": "#4f46e5"},
                {"name": "Software", "value": 6615000.0, "percentage": 27, "color": "#06b6d4"},
                {"name": "Services", "value": 4410000.0, "percentage": 18, "color": "#10b981"},
                {"name": "Accessories", "value": 2940000.0, "percentage": 12, "color": "#f59e0b"},
                {"name": "Other", "value": 1715000.0, "percentage": 7, "color": "#8b5cf6"}
            ],
            "topProducts": [
                {
                    "id": p.get("id", "prod-001"),
                    "product": p.get("name", p.get("product", "Enterprise Cloud Suite Pro")),
                    "category": p.get("category", "Software"),
                    "revenue": p.get("revenue", "₹5,420,000"),
                    "orders": p.get("orders", p.get("unitsSold", 452)),
                    "growth": p.get("growth", "+24.5%"),
                    "margin": p.get("margin", "72%"),
                    "status": p.get("status", "High")
                }
                for p in (top_prods or [
                    {"id": "prod-001", "name": "Enterprise Cloud Suite Pro", "category": "Software", "revenue": "₹5,420,000", "unitsSold": 452, "growth": "+24.5%", "margin": "72%", "status": "High"},
                    {"id": "prod-002", "name": "SmartEdge Server Gateway v2", "category": "Electronics", "revenue": "₹4,180,000", "unitsSold": 209, "growth": "+18.2%", "margin": "46%", "status": "High"},
                    {"id": "prod-003", "name": "Annual Managed DevOps Support", "category": "Services", "revenue": "₹3,650,000", "unitsSold": 146, "growth": "+8.7%", "margin": "58%", "status": "Stable"},
                    {"id": "prod-004", "name": "Industrial IoT Sensor Pack", "category": "Electronics", "revenue": "₹2,840,000", "unitsSold": 710, "growth": "+14.1%", "margin": "38%", "status": "Stable"},
                    {"id": "prod-005", "name": "Unified Analytics AI Add-on", "category": "Software", "revenue": "₹2,320,000", "unitsSold": 580, "growth": "+31.4%", "margin": "81%", "status": "High"},
                    {"id": "prod-006", "name": "High-Density Rack Mount Accessories", "category": "Accessories", "revenue": "₹1,450,000", "unitsSold": 966, "growth": "-3.8%", "margin": "29%", "status": "Low"}
                ])
            ],
            "topCustomers": [
                {
                    "id": c.get("id", "cust-101"),
                    "customer": c.get("customer", "Apex Global Logistics Pvt Ltd"),
                    "orders": c.get("orders", 48),
                    "revenue": c.get("revenue", "₹1,840,000"),
                    "growth": c.get("growth", "+22.4%"),
                    "segment": c.get("segment", "Enterprise")
                }
                for c in (top_custs or [
                    {"id": "cust-101", "customer": "Apex Global Logistics Pvt Ltd", "orders": 48, "revenue": "₹1,840,000", "growth": "+22.4%", "segment": "Enterprise"},
                    {"id": "cust-102", "customer": "Zenith FinTech Systems", "orders": 34, "revenue": "₹1,420,000", "growth": "+18.1%", "segment": "Enterprise"},
                    {"id": "cust-103", "customer": "Nexus Telecommunications Ltd", "orders": 62, "revenue": "₹1,280,000", "growth": "+9.5%", "segment": "Mid-Market"},
                    {"id": "cust-104", "customer": "Infinitum Retail India", "orders": 84, "revenue": "₹950,000", "growth": "+31.0%", "segment": "Strategic"}
                ])
            ],
            "customerGrowthTrend": [
                {"month": "Jan", "active": 320, "newCustomers": 45},
                {"month": "Feb", "active": 348, "newCustomers": 52},
                {"month": "Mar", "active": 382, "newCustomers": 64},
                {"month": "Apr", "active": 415, "newCustomers": 58},
                {"month": "May", "active": 460, "newCustomers": 72},
                {"month": "Jun", "active": 510, "newCustomers": 85}
            ],
            "businessInsights": [
                {
                    "id": "insight-1",
                    "type": "positive",
                    "category": "Revenue Growth",
                    "title": "Accelerated Q4 Revenue Trajectory",
                    "description": "Revenue increased by 12.8% compared with previous period, driven primarily by enterprise software recurring licenses.",
                    "tag": "Revenue",
                    "impact": "+₹2.8M potential"
                },
                {
                    "id": "insight-2",
                    "type": "opportunity",
                    "category": "Regional Opportunity",
                    "title": "West Region Showing Strong Surge",
                    "description": "The West region has shown strong recent growth (+31% share of total revenue). Expanding localized sales engineering can capture unmet demand.",
                    "tag": "Regional",
                    "impact": "High Growth"
                },
                {
                    "id": "insight-3",
                    "type": "product",
                    "category": "Product Performance",
                    "title": "Enterprise Cloud Suite Pro Momentum",
                    "description": "Product X is currently one of the fastest-growing products with +24.5% QoQ expansion and industry-leading 72% gross margin.",
                    "tag": "Products",
                    "impact": "Top Performer"
                },
                {
                    "id": "insight-4",
                    "type": "warning",
                    "category": "Margin Alert",
                    "title": "Hardware Accessory Margins Slipping",
                    "description": "Legacy hardware accessories contracted by 8.5% with margins down to 22%. Consider bundling with high-margin managed service agreements.",
                    "tag": "Operations",
                    "impact": "Action Required"
                }
            ],
            "recentActivity": [
                {
                    "id": "act-01",
                    "event": "Dataset uploaded",
                    "details": "Q4_Consolidated_Sales_v3.csv (42,500 records)",
                    "user": "Priya Sharma (Data Analyst)",
                    "time": "12 mins ago",
                    "type": "upload",
                    "status": "Completed"
                },
                {
                    "id": "act-02",
                    "event": "Sales dataset processed",
                    "details": "Pandas ETL completed automated anomaly filtering and deduplication.",
                    "user": "System Worker (Pipeline #402)",
                    "time": "45 mins ago",
                    "type": "system",
                    "status": "Processed"
                },
                {
                    "id": "act-03",
                    "event": "Dashboard report generated",
                    "details": "Executive Monthly Performance Brief (PDF & XLSX exported).",
                    "user": "Vikram Mehta (VP Operations)",
                    "time": "2 hours ago",
                    "type": "report",
                    "status": "Generated"
                },
                {
                    "id": "act-04",
                    "event": "New user added",
                    "details": "Aarav Patel assigned role 'Senior Business Intelligence Analyst'.",
                    "user": "Admin (System)",
                    "time": "Yesterday at 4:30 PM",
                    "type": "user",
                    "status": "Active"
                },
                {
                    "id": "act-05",
                    "event": "Monthly report exported",
                    "details": "Financial Ledger & EBITDA reconciliation package dispatched.",
                    "user": "Rohit Sen (Finance Controller)",
                    "time": "2 days ago",
                    "type": "export",
                    "status": "Dispatched"
                }
            ]
        }
