def analyze_stock(stock: str, sector: str, expected_return: float):
    if expected_return > 30:
        return {
            "risk": "High Risk",
            "score": 85,
            "message": "Expected returns exceed realistic market limits.",
            "ai_advice": f"⚠️ {stock} in {sector} sector looks hype-driven."
        }

    return {
        "risk": "Safe",
        "score": 25,
        "message": "Expected returns are within normal market range.",
        "ai_advice": f"✅ {stock} in {sector} sector appears reasonable."
    }
