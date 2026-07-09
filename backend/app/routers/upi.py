from fastapi import APIRouter
from app.schemas import UpiScan
from app.services.upi_checker import check_upi

router = APIRouter(prefix="/scan", tags=["UPI"])

@router.post("/upi")
def scan_upi(data: UpiScan):

    level, confidence, indicators = check_upi(data.upi)

    return {
        "risk_level": level,
        "confidence": confidence,
        "explanation": "UPI fraud analysis",
        "indicators": indicators
    }
