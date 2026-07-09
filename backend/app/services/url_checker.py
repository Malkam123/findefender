import re
import tldextract

def check_url(url: str):
    indicators = []

    url = url.lower()

    ext = tldextract.extract(url)

    suspicious_domains = ["tk", "ml", "ga", "cf", "gq"]

    phishing_keywords = [
        "login",
        "verify",
        "bank",
        "update",
        "secure",
        "account",
        "signin",
        "password",
        "otp",
        "free",
        "gift",
        "winner",
        "lottery",
        "claim",
        "prize"
    ]

    confidence = 20
    risk = "SAFE"

    # Suspicious TLD
    if ext.suffix in suspicious_domains:
        indicators.append(f"Suspicious domain: .{ext.suffix}")
        confidence = 90
        risk = "SCAM"

    # Phishing keywords
    for word in phishing_keywords:
        if word in url:
            indicators.append(f"Keyword detected: {word}")
            confidence = max(confidence, 70)
            if risk != "SCAM":
                risk = "SUSPICIOUS"

    # Raw IP instead of domain
    if re.search(r"https?://\d+\.\d+\.\d+\.\d+", url):
        indicators.append("Raw IP address detected")
        confidence = 95
        risk = "SCAM"

    # HTTPS check
    if not url.startswith("https://"):
        indicators.append("Not using HTTPS")
        confidence = max(confidence, 50)
        if risk == "SAFE":
            risk = "SUSPICIOUS"

    return {
        "riskLevel": risk,
        "confidence": confidence,
        "explanation": "URL analyzed using rule-based detection",
        "indicators": indicators
    }