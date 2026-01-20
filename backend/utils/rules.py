import re

SCAM_KEYWORDS = ["win", "urgent", "free", "reward", "lottery"]

def contains_scam_keywords(text: str) -> bool:
    return any(word in text.lower() for word in SCAM_KEYWORDS)

def valid_upi_format(upi: str) -> bool:
    pattern = r'^[\w.\-]{2,256}@[a-zA-Z]{2,64}$'
    return bool(re.match(pattern, upi))
