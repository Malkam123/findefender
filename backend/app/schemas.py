from pydantic import BaseModel

class MessageScan(BaseModel):
    message: str

class PhoneScan(BaseModel):
    phone: str

class UrlScan(BaseModel):
    url: str

class UpiScan(BaseModel):
    upi: str
