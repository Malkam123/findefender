from fastapi import APIRouter
from app.schemas import MessageScan
from app.services.scam_service import scam_service

router = APIRouter(prefix="/scan", tags=["Message Scan"])

@router.post("/message")
def analyze_message(data: MessageScan):
    result = scam_service.predict_message(data.message)
    return result
