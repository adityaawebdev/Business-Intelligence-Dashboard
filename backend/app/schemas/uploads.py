from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict


class DatasetUploadResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    filename: str
    file_type: str = Field(..., alias="fileType")
    status: str
    message: str
    file_size_bytes: Optional[int] = Field(None, alias="fileSizeBytes")


class DatasetItem(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str
    file_type: str = Field(..., alias="fileType")
    file_size: str = Field(..., alias="fileSize")
    records: str
    uploaded_by: str = Field(..., alias="uploadedBy")
    uploaded_date: str = Field(..., alias="uploadedDate")
    status: str
    processing_time: str = Field(..., alias="processingTime")
