from fastapi import APIRouter
from ai.phone_model import analyze_phone
from utils.scoring import generate_risk

router = APIRouter()

@router.post("/")
def scan_phone(phone: str):
    score, reasons = analyze_phone(phone)
    status, confidence = generate_risk(score)

    return {
        "status": status,
        "risk_score": score,
        "title": "Phone Number Analysis",
        "details": reasons,
        "confidence": confidence
    }
