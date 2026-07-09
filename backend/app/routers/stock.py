from fastapi import APIRouter
import requests
import os
from dotenv import load_dotenv

load_dotenv()

FINNHUB_KEY = os.getenv("FINNHUB_KEY")
if not FINNHUB_KEY:
    raise ValueError("FINNHUB_KEY is missing in  .env")
ALPHA_KEY = os.getenv("ALPHA_KEY")

router = APIRouter(prefix="/stock", tags=["Stock Legitimacy"])


def get_finnhub(symbol: str):
    url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_KEY}"
    return requests.get(url).json()


def get_alpha(symbol: str):
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={ALPHA_KEY}"
    return requests.get(url).json()


# ✅ LEGITIMACY CHECK API
@router.get("/{symbol}")
def trade_legitimacy(symbol: str):
    try:
        fin = get_finnhub(symbol)
        alpha = get_alpha(symbol)

        fin_price = fin.get("c", 0)
        alpha_price = 0

        if "Global Quote" in alpha and "05. price" in alpha["Global Quote"]:
            alpha_price = float(alpha["Global Quote"]["05. price"])

        price_match = abs(fin_price - alpha_price) < 1 if alpha_price else False

        legitimacy_score = 0
        if price_match:
            legitimacy_score += 40
        if fin_price > 0:
            legitimacy_score += 30
        if fin.get("h", 0) > 0:
            legitimacy_score += 30

        return {
            "symbol": symbol,
            "finnhub_price": fin_price,
            "alpha_price": alpha_price,
            "price_verified": price_match,
            "legitimacy_score": legitimacy_score,
            "status": "LEGIT" if legitimacy_score >= 70 else "RISKY"
        }

    except Exception as e:
        return {"error": str(e)}


# ✅ REALTIME PRICE API
@router.get("/realtime/{symbol}")
def realtime_price(symbol: str):
    try:
        fin = get_finnhub(symbol)
        return {"price": fin.get("c", 0)}
    except Exception as e:
        return {"error": str(e)}
