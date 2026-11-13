from typing import Generator, Optional
from sqlalchemy.orm import Session
from app.database.connection import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI database session dependency.
    Yields a SQLAlchemy Session and guarantees teardown after request completion.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_optional_db() -> Generator[Optional[Session], None, None]:
    """
    Database session dependency for services that utilize the database
    and gracefully handle fallbacks if needed.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
