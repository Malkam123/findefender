import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

MODEL_PATH = BASE_DIR / "ml/scam_model.pkl"
VECTORIZER_PATH = BASE_DIR / "ml/vectorizer.pkl"


class ScamService:

    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.load_models()

    def load_models(self):

        try:
            self.model = joblib.load(MODEL_PATH)
            self.vectorizer = joblib.load(VECTORIZER_PATH)

            print("✅ Scam Model Loaded Successfully")

        except Exception as e:
            print("❌ MODEL LOADING FAILED:", e)


    def predict_message(self, message: str):

        if not self.model:
            return {
                "risk_level": "UNKNOWN",
                "confidence": 0,
                "explanation": "Model not loaded",
                "indicators": []
            }

        vector = self.vectorizer.transform([message])

        prediction = self.model.predict(vector)[0]
        probability = self.model.predict_proba(vector)[0][1]

        confidence = int(probability * 100)

        if confidence > 75:
            risk = "SCAM"
        elif confidence > 40:
            risk = "SUSPICIOUS"
        else:
            risk = "SAFE"

        return {
            "risk_level": risk,
            "confidence": confidence,
            "explanation": "Analyzed using ML scam detection",
            "indicators": self.extract_indicators(message)
        }


    def extract_indicators(self, message):

        keywords = [
            "urgent", "otp", "bank", "lottery",
            "winner", "click", "verify", "prize"
        ]

        return [k for k in keywords if k in message.lower()]


# ⭐ VERY IMPORTANT SINGLETON
scam_service = ScamService()
