import re

def normalize_phone(phone):
    phone = re.sub(r"\D", "", phone)
    if len(phone) == 10:
        return "+91" + phone
    return phone

def valid_upi(upi):
    return bool(re.match(r"^[\w.-]+@[\w]+$", upi))
