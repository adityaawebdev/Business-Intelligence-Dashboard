from typing import List
from pydantic import BaseModel, Field, ConfigDict


class ProductSummary(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    total_products: int = Field(..., alias="totalProducts")
    best_performing_product: str = Field(..., alias="bestPerformingProduct")
    highest_revenue_product: str = Field(..., alias="highestRevenueProduct")
    highest_margin_product: str = Field(..., alias="highestMarginProduct")
    top_margin_pct: float = Field(..., alias="topMarginPct")


class ProductCategoryPerformance(BaseModel):
    category: str
    revenue: float
    margin: int
    volume: int


class ProductCategoryItem(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str
    description: str
    total_skus: int = Field(..., alias="totalSkus")


class ProductDetail(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str
    category: str
    price: str
    units_sold: int = Field(..., alias="unitsSold")
    revenue: str
    margin: str
    stock: str
    status: str
