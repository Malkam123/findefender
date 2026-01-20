from utils.rules import valid_upi_format

SCAM_UPIS = ["fraud@ybl", "scam@upi"]

def analyze_upi(upi: str):
    if not valid_upi_format(upi):
        return 100, ["Invalid UPI format"]

    if upi.lower() in SCAM_UPIS:
        return 90, ["Reported scam UPI"]

    return 10, ["No fraud reports"]
