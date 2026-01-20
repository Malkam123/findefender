from fastapi import APIRouter
from ai.upi_model import analyze_upi
from utils.scoring import generate_risk

router = APIRouter()

@router.post("/")
def scan_upi(upi: str):
    score, reasons = analyze_upi(upi)
    status, confidence = generate_risk(score)

    return {
        "status": status,
        "risk_score": score,
        "title": "UPI Verification",
        "details": reasons,
        "confidence": confidence
    }
