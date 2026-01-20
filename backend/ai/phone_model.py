def analyze_phone(phone: str):
    score = 0
    reasons = []

    if phone.endswith("0000"):
        score += 50
        reasons.append("Frequently reported number")

    if phone.startswith("+91"):
        score += 10

    return score, reasons
