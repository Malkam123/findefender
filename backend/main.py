from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.link import router as link_router
from routes.message import router as message_router
from routes.phone import router as phone_router
from routes.stock import router as stock_router
from routes.upi import router as upi_router

app = FastAPI(
    title="Findefender API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(link_router, prefix="/scan/link", tags=["Link"])
app.include_router(message_router, prefix="/scan/message", tags=["Message"])
app.include_router(phone_router, prefix="/scan/phone", tags=["Phone"])
app.include_router(stock_router, prefix="/scan/stock", tags=["Stock"])
app.include_router(upi_router, prefix="/scan/upi", tags=["UPI"])

@app.get("/")
def root():
    return {"status": "Findefender backend running"}
