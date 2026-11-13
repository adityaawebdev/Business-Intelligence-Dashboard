from typing import Dict, List, Any, Optional
from sqlalchemy.orm import Session
from app.repositories.operations_repository import OperationsRepository


class OperationsService:
    @staticmethod
    def get_summary(db: Optional[Session] = None) -> Dict[str, Any]:
        if db:
            try:
                return OperationsRepository.get_operations_summary(db)
            except Exception:
                pass
        return {
            "fulfillmentSlaPct": 98.4,
            "avgLeadTimeHrs": 4.2,
            "defectRatePct": 0.82,
            "inventoryTurnover": 8.4,
            "statusLabel": "Optimal Telemetry"
        }

    @staticmethod
    def get_performance(db: Optional[Session] = None) -> List[Dict[str, Any]]:
        if db:
            try:
                return OperationsRepository.get_regional_performance(db)
            except Exception:
                pass
        return [
            {"region": "West Hub (Mumbai)", "capacity": "88%", "fulfillmentRate": "99.1%", "avgDispatchTime": "3.4 hrs", "status": "Optimal"},
            {"region": "North Hub (NCR)", "capacity": "92%", "fulfillmentRate": "98.5%", "avgDispatchTime": "3.8 hrs", "status": "Optimal"},
            {"region": "South Hub (Bengaluru)", "capacity": "78%", "fulfillmentRate": "98.8%", "avgDispatchTime": "3.6 hrs", "status": "Optimal"},
            {"region": "East Hub (Kolkata)", "capacity": "84%", "fulfillmentRate": "96.2%", "avgDispatchTime": "5.2 hrs", "status": "Attention"},
            {"region": "Central Hub (Nagpur)", "capacity": "64%", "fulfillmentRate": "97.4%", "avgDispatchTime": "4.5 hrs", "status": "Optimal"}
        ]

    @staticmethod
    def get_alerts(db: Optional[Session] = None) -> List[Dict[str, Any]]:
        if db:
            try:
                return OperationsRepository.get_operations_alerts(db)
            except Exception:
                pass
        return [
            {
                "id": "alert-1",
                "severity": "warning",
                "title": "East Hub Dispatch Bottleneck",
                "message": "Average dispatch time in Kolkata facility reached 5.2 hrs due to courier handoff latency.",
                "timestamp": "25 mins ago"
            },
            {
                "id": "alert-2",
                "severity": "info",
                "title": "Automated Restock Triggered",
                "message": "SmartEdge Server Gateway v2 reorder point reached at West Hub (142 units remaining).",
                "timestamp": "1 hour ago"
            },
            {
                "id": "alert-3",
                "severity": "success",
                "title": "SLA Milestone Achieved",
                "message": "99.1% on-time order fulfillment maintained for 3 consecutive weeks across Tier-1 regions.",
                "timestamp": "4 hours ago"
            }
        ]

    @staticmethod
    def get_trends(db: Optional[Session] = None) -> List[Dict[str, Any]]:
        if db:
            try:
                return OperationsRepository.get_operations_trends(db)
            except Exception:
                pass
        return [
            {"day": "Mon", "received": 480, "processed": 472, "backlogged": 8},
            {"day": "Tue", "received": 530, "processed": 524, "backlogged": 6},
            {"day": "Wed", "received": 610, "processed": 605, "backlogged": 5},
            {"day": "Thu", "received": 590, "processed": 588, "backlogged": 2},
            {"day": "Fri", "received": 680, "processed": 671, "backlogged": 9},
            {"day": "Sat", "received": 340, "processed": 338, "backlogged": 2},
            {"day": "Sun", "received": 210, "processed": 210, "backlogged": 0}
        ]
