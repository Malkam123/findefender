import re

def check_phone(phone):

    indicators = []

    if not re.fullmatch(r"\+?\d{10,13}", phone):
        indicators.append("Invalid phone format")
        return "SUSPICIOUS", 60, indicators

    if phone.startswith("+234") or phone.startswith("+92"):
        indicators.append("High scam region prefix")
        return "SCAM", 85, indicators

    return "SAFE", 20, indicators
