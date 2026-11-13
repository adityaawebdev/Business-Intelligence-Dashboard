from typing import List, Optional
from sqlalchemy import select, update
from sqlalchemy.orm import Session
from app.models.dataset import Dataset


class DatasetRepository:
    """Repository handling CRUD operations on the datasets table."""

    @staticmethod
    def create_dataset(
        db: Session,
        name: str,
        original_filename: str,
        file_type: str,
        file_size: int,
        record_count: int = 0,
        status: str = "uploaded",
        uploaded_by: Optional[int] = None
    ) -> Dataset:
        dataset = Dataset(
            name=name,
            original_filename=original_filename,
            file_type=file_type,
            file_size=file_size,
            record_count=record_count,
            status=status,
            uploaded_by=uploaded_by
        )
        db.add(dataset)
        db.commit()
        db.refresh(dataset)
        return dataset

    @staticmethod
    def get_dataset(db: Session, dataset_id: int) -> Optional[Dataset]:
        return db.scalar(select(Dataset).where(Dataset.id == dataset_id))

    @staticmethod
    def list_datasets(db: Session, limit: int = 50) -> List[Dataset]:
        stmt = select(Dataset).order_by(Dataset.id.desc()).limit(limit)
        return list(db.scalars(stmt).all())

    @staticmethod
    def update_dataset_status(db: Session, dataset_id: int, status: str) -> Optional[Dataset]:
        stmt = (
            update(Dataset)
            .where(Dataset.id == dataset_id)
            .values(status=status)
            .returning(Dataset)
        )
        result = db.scalar(stmt)
        db.commit()
        return result
