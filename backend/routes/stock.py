from fastapi import APIRouter
from pydantic import BaseModel
from ai.stock_model import analyze_stock

router = APIRouter()

class StockRequest(BaseModel):
    stock: str
    sector: str
    expected_return: float

@router.post("/")
def scan_stock(data: StockRequest):
    return analyze_stock(
        data.stock,
        data.sector,
        data.expected_return
    )
