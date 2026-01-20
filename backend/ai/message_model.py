from utils.rules import contains_scam_keywords

def analyze_message(text: str):
    score = 0
    reasons = []

    if contains_scam_keywords(text):
        score += 60
        reasons.append("Scam keywords detected")

    if len(text) < 10:
        score += 20
        reasons.append("Suspicious short message")

    return score, reasons
