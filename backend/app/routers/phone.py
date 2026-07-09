from fastapi import APIRouter
from app.schemas import PhoneScan
from app.services.phone_checker import check_phone

router = APIRouter(prefix="/scan", tags=["Phone"])

@router.post("/phone")
def scan_phone(data: PhoneScan):
    level, confidence, indicators = check_phone(data.phone)

    return {
        "risk_level": level,
        "confidence": confidence,
        "explanation": "Phone risk analysis",
        "indicators": indicators
    }
