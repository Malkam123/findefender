def analyze_link(url: str):
    score = 0
    reasons = []

    if "login" in url or "verify" in url:
        score += 40
        reasons.append("Phishing keywords in URL")

    if not url.startswith("https"):
        score += 30
        reasons.append("Insecure connection")

    return score, reasons
