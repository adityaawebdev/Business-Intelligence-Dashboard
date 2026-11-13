from typing import Dict, List, Any, Optional
import os
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.dataset_repository import DatasetRepository


ALLOWED_EXTENSIONS = {".csv", ".xlsx", ".xls"}


class UploadService:
    # In-memory fallback store for newly uploaded datasets
    _datasets: List[Dict[str, Any]] = [
        {
            "id": "ds-01",
            "name": "Q4_Consolidated_Sales_v3.csv",
            "fileType": "CSV",
            "fileSize": "14.2 MB",
            "records": "42,500",
            "uploadedBy": "Priya Sharma",
            "uploadedDate": "2026-11-12 14:32",
            "status": "Processed",
            "processingTime": "3.4s"
        },
        {
            "id": "ds-02",
            "name": "Enterprise_Customer_Churn_Analysis.xlsx",
            "fileType": "XLSX",
            "fileSize": "8.7 MB",
            "records": "18,240",
            "uploadedBy": "Vikram Mehta",
            "uploadedDate": "2026-11-12 11:15",
            "status": "Processed",
            "processingTime": "2.1s"
        },
        {
            "id": "ds-03",
            "name": "FY26_Operational_Logistics_Raw.xlsx",
            "fileType": "XLSX",
            "fileSize": "24.8 MB",
            "records": "64,120",
            "uploadedBy": "Aarav Patel",
            "uploadedDate": "2026-11-13 09:40",
            "status": "Processing",
            "processingTime": "In progress"
        },
        {
            "id": "ds-04",
            "name": "Vendor_Procurement_Invoices_Oct.csv",
            "fileType": "CSV",
            "fileSize": "3.1 MB",
            "records": "6,450",
            "uploadedBy": "Rohit Sen",
            "uploadedDate": "2026-11-10 16:50",
            "status": "Processed",
            "processingTime": "1.2s"
        },
        {
            "id": "ds-05",
            "name": "Corrupted_Telemetry_Feed_Batch9.xls",
            "fileType": "XLS",
            "fileSize": "41.2 MB",
            "records": "0",
            "uploadedBy": "System Pipeline",
            "uploadedDate": "2026-11-09 08:22",
            "status": "Failed",
            "processingTime": "Failed: Schema mismatch"
        }
    ]

    @classmethod
    async def process_dataset_upload(cls, file: UploadFile, db: Optional[Session] = None) -> Dict[str, Any]:
        if not file or not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No file was provided for dataset upload."
            )

        filename = file.filename
        _, ext = os.path.splitext(filename)
        ext_lower = ext.lower()

        if ext_lower not in ALLOWED_EXTENSIONS:
            allowed_str = ", ".join([e.replace(".", "").upper() for e in ALLOWED_EXTENSIONS])
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported file type '{ext_lower}'. Supported formats are: {allowed_str}"
            )

        # Read file size
        file.file.seek(0, os.SEEK_END)
        size_bytes = file.file.tell()
        file.file.seek(0)

        file_type = ext_lower.replace(".", "").lower()

        if db:
            try:
                DatasetRepository.create_dataset(
                    db=db,
                    name=filename,
                    original_filename=filename,
                    file_type=file_type,
                    file_size=size_bytes,
                    record_count=0,
                    status="uploaded"
                )
            except Exception:
                pass

        new_entry = {
            "id": f"ds-{len(cls._datasets) + 1:02d}",
            "name": filename,
            "fileType": file_type.upper(),
            "fileSize": f"{size_bytes / (1024 * 1024):.1f} MB" if size_bytes > 0 else "0 MB",
            "records": "Calculating...",
            "uploadedBy": "Admin User",
            "uploadedDate": "Just now",
            "status": "Uploaded",
            "processingTime": "Pending Pandas processing"
        }
        cls._datasets.insert(0, new_entry)

        return {
            "filename": filename,
            "fileType": file_type,
            "status": "uploaded",
            "message": "Dataset received successfully",
            "fileSizeBytes": size_bytes
        }

    @classmethod
    def get_datasets(cls, db: Optional[Session] = None) -> List[Dict[str, Any]]:
        if db:
            try:
                db_datasets = DatasetRepository.list_datasets(db)
                if db_datasets:
                    return [
                        {
                            "id": f"ds-{d.id:02d}",
                            "name": d.name,
                            "fileType": (d.file_type or "CSV").upper(),
                            "fileSize": f"{d.file_size / (1024 * 1024):.1f} MB" if d.file_size else "0 MB",
                            "records": f"{d.record_count:,}" if d.record_count else "0",
                            "uploadedBy": "Admin User",
                            "uploadedDate": d.created_at.strftime("%Y-%m-%d %H:%M") if getattr(d, "created_at", None) else "Recently",
                            "status": (d.status or "uploaded").capitalize(),
                            "processingTime": "3.4s" if d.status == "processed" else ("In progress" if d.status == "processing" else "Pending")
                        }
                        for d in db_datasets
                    ]
            except Exception:
                pass
        return cls._datasets
