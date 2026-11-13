from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, Depends, status
from sqlalchemy.orm import Session
from app.database.dependencies import get_optional_db
from app.schemas.uploads import DatasetUploadResponse, DatasetItem
from app.services.upload_service import UploadService
from app.utils.responses import APIResponse, success_response

router = APIRouter(prefix="/uploads", tags=["Dataset Uploads & Ingestion"])


@router.post(
    "/dataset",
    response_model=APIResponse[DatasetUploadResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Upload and validate a business dataset file (CSV, XLSX, XLS)"
)
async def upload_dataset(
    file: UploadFile = File(...),
    db: Optional[Session] = Depends(get_optional_db)
):
    """
    Ingests and validates raw business datasets for future Pandas ETL processing.
    Validates file presence and allowable extensions (.csv, .xlsx, .xls).
    """
    result = await UploadService.process_dataset_upload(file, db=db)
    return success_response(
        data=result,
        message="Dataset received and queued for processing."
    )


@router.get(
    "/datasets",
    response_model=APIResponse[List[DatasetItem]],
    summary="Get listing of ingested datasets and ETL pipeline statuses"
)
async def get_uploaded_datasets(db: Optional[Session] = Depends(get_optional_db)):
    datasets = UploadService.get_datasets(db=db)
    return success_response(
        data=datasets,
        message="Uploaded datasets list retrieved successfully."
    )
