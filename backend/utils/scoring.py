def generate_risk(score: int):
    if score >= 80:
        return "scam", "high"
    elif score >= 40:
        return "warning", "medium"
    else:
        return "safe", "high"
