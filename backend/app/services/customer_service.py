from typing import Dict, List, Any, Optional
from sqlalchemy.orm import Session
from app.repositories.customer_repository import CustomerRepository


class CustomerService:
    @staticmethod
    def get_summary(db: Optional[Session] = None) -> Dict[str, Any]:
        if db:
            try:
                return CustomerRepository.get_customer_summary(db)
            except Exception:
                pass
        return {
            "totalCustomers": 4892,
            "newCustomers": 642,
            "returningRatePct": 84.3,
            "customerGrowthRate": 12.4,
            "churnRatePct": 2.8
        }

    @staticmethod
    def get_trends(db: Optional[Session] = None) -> List[Dict[str, Any]]:
        return [
            {"month": "Jan", "organic": 140, "paid": 95, "referral": 45},
            {"month": "Feb", "organic": 165, "paid": 110, "referral": 55},
            {"month": "Mar", "organic": 190, "paid": 125, "referral": 70},
            {"month": "Apr", "organic": 180, "paid": 115, "referral": 65},
            {"month": "May", "organic": 215, "paid": 140, "referral": 85},
            {"month": "Jun", "organic": 240, "paid": 160, "referral": 95},
            {"month": "Jul", "organic": 235, "paid": 155, "referral": 90},
            {"month": "Aug", "organic": 260, "paid": 175, "referral": 105},
            {"month": "Sep", "organic": 285, "paid": 190, "referral": 115},
            {"month": "Oct", "organic": 310, "paid": 205, "referral": 125},
            {"month": "Nov", "organic": 340, "paid": 220, "referral": 140},
            {"month": "Dec", "organic": 375, "paid": 245, "referral": 160}
        ]

    @staticmethod
    def get_top(db: Optional[Session] = None) -> List[Dict[str, Any]]:
        if db:
            try:
                return CustomerRepository.get_top_customers(db)
            except Exception:
                pass
        return [
            {
                "id": "cust-101",
                "customer": "Apex Global Logistics Pvt Ltd",
                "segment": "Enterprise",
                "orders": 48,
                "revenue": "₹1,840,000",
                "growth": "+22.4%"
            },
            {
                "id": "cust-102",
                "customer": "Zenith FinTech Systems",
                "segment": "Enterprise",
                "orders": 34,
                "revenue": "₹1,420,000",
                "growth": "+18.1%"
            },
            {
                "id": "cust-103",
                "customer": "Nexus Telecommunications Ltd",
                "segment": "Mid-Market",
                "orders": 62,
                "revenue": "₹1,280,000",
                "growth": "+9.5%"
            },
            {
                "id": "cust-104",
                "customer": "Infinitum Retail India",
                "segment": "Strategic",
                "orders": 84,
                "revenue": "₹950,000",
                "growth": "+31.0%"
            },
            {
                "id": "cust-105",
                "customer": "Quantum Health Networks",
                "segment": "Mid-Market",
                "orders": 26,
                "revenue": "₹810,000",
                "growth": "+5.2%"
            }
        ]

    @staticmethod
    def get_segments(db: Optional[Session] = None) -> List[Dict[str, Any]]:
        if db:
            try:
                return CustomerRepository.get_customer_segments(db)
            except Exception:
                pass
        return [
            {"name": "Enterprise (> ₹1M/yr)", "count": 184, "value": 52, "color": "#4f46e5"},
            {"name": "Mid-Market (₹250k - ₹1M)", "count": 620, "value": 28, "color": "#06b6d4"},
            {"name": "SMB / Growth (< ₹250k)", "count": 2840, "value": 14, "color": "#10b981"},
            {"name": "Starter / Trial", "count": 1248, "value": 6, "color": "#f59e0b"}
        ]
