import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib

# Load dataset
df = pd.read_csv("app/data/scam_dataset.csv")

X_train, X_test, y_train, y_test = train_test_split(df["text"], df["label"], test_size=0.2)

vectorizer = TfidfVectorizer(stop_words="english")
X_train_vec = vectorizer.fit_transform(X_train)

model = LogisticRegression()
model.fit(X_train_vec, y_train)

# Save model
joblib.dump(model, "app/utils/scam_model.pkl")
joblib.dump(vectorizer, "app/utils/vectorizer.pkl")

print("✅ AI Scam Model Trained & Saved")
