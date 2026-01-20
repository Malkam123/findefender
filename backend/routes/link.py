from fastapi import APIRouter
from ai.link_model import analyze_link
from utils.scoring import generate_risk

router = APIRouter()

@router.post("/")
def scan_link(url: str):
    score, reasons = analyze_link(url)
    status, confidence = generate_risk(score)

    return {
        "status": status,
        "risk_score": score,
        "title": "Link Safety Check",
        "details": reasons,
        "confidence": confidence
    }
