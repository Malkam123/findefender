def check_upi(upi):

    indicators = []

    if not upi.count("@") == 1:
        indicators.append("Invalid UPI format")
        return "SUSPICIOUS", 65, indicators

    risky_handles = ["paytm", "okaxis-test"]

    if any(r in upi for r in risky_handles):
        indicators.append("Known risky handle")

        return "SCAM", 85, indicators

    return "SAFE", 25, indicators
