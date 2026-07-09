from fastapi import APIRouter
from app.schemas import UrlScan
from app.services.url_checker import check_url

router = APIRouter(prefix="/scan", tags=["URL"])

@router.post("/url")
def scan_url(data: UrlScan):
    return check_url(data.url)