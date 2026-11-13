from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict


class ReportItem(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str
    type: str
    frequency: str
    created_by: str = Field(..., alias="createdBy")
    created_date: str = Field(..., alias="createdDate")
    file_size: str = Field(..., alias="fileSize")
    status: str


class ReportCreateRequest(BaseModel):
    name: str
    type: str = "Executive Summary (PDF)"
    frequency: Optional[str] = "Ad-hoc"
    description: Optional[str] = None


class ReportDetail(ReportItem):
    model_config = ConfigDict(populate_by_name=True)

    download_url: Optional[str] = Field(None, alias="downloadUrl")
    parameters: Optional[dict] = None
