from fastapi import APIRouter
from ai.message_model import analyze_message
from utils.scoring import generate_risk

router = APIRouter()

@router.post("/")
def scan_message(message: str):
    score, reasons = analyze_message(message)
    status, confidence = generate_risk(score)

    return {
        "status": status,
        "risk_score": score,
        "title": "Message Scan Result",
        "details": reasons,
        "confidence": confidence
    }
