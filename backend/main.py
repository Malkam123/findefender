from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.stock import router as stock_router
from app.routers import message, phone, url, upi,user

app = FastAPI(title="Findefender API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(message.router)
app.include_router(phone.router)
app.include_router(url.router)
app.include_router(upi.router)
app.include_router(stock_router)
app.include_router(user.router)


@app.get("/")
def home():
    return {"status": "Backend Running"}
