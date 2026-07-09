# 🛡️ FinDefender – AI-Powered Financial Fraud Detection Platform

> Detect scams before they happen. FinDefender helps users identify fraudulent messages, malicious URLs, suspicious phone numbers, fake UPI IDs, and risky stocks using AI and rule-based analysis.

---

## 📌 Overview

FinDefender is a full-stack web application developed to improve digital financial safety. It combines Machine Learning, cybersecurity rules, and real-time analysis to help users detect potential scams across multiple channels.

The platform is designed with an intuitive interface and provides instant risk analysis along with explanations for every scan.

---

## ✨ Features

### 🤖 AI Message Scam Detection
- Machine Learning based scam detection
- Hybrid ML + Rule-Based analysis
- Confidence score
- Detection indicators
- Risk classification:
  - ✅ Safe
  - ⚠️ Suspicious
  - 🚨 Scam

---

### 🌐 URL Scanner
Detects malicious URLs using:

- Suspicious domains
- Phishing keywords
- HTTP vs HTTPS
- Raw IP address detection
- Scam indicators

---

### 📞 Phone Number Scanner

Analyzes phone numbers for potential fraud using:

- Blacklist checks
- Spam indicators
- Rule-based detection

---

### 💳 UPI ID Scanner

Checks UPI IDs for suspicious patterns including:

- Fake merchant IDs
- Suspicious naming
- Fraud indicators

---

### 📈 Stock Risk Analysis

Provides investment insights by analyzing:

- Stock trends
- Risk levels
- Investment suggestions

---

### 📊 Dashboard

Interactive dashboard displaying:

- Recent scans
- Risk statistics
- User activity
- Security overview

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

---

### Backend

- FastAPI
- Python
- Scikit-learn
- Joblib
- SQLite
- JWT Authentication

---

### Machine Learning

- TF-IDF Vectorizer
- Logistic Regression
- Hybrid Rule-Based Detection
- Scikit-learn

---

## 📂 Project Structure

```
findefender_1.0/

│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── ml/
│   │   └── schemas.py
│   ├── fraud.db
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── public/
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd findefender_1.0
```

---

## Backend Setup

Navigate to backend

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
python -m uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## 📷 Application Modules

- Dashboard
- Message Scanner
- URL Scanner
- Phone Scanner
- UPI Scanner
- Stock Analysis
- Authentication
- Scan History

---

## 🧠 How Scam Detection Works

### Message Scanner

1. User submits a message.
2. Text is converted using TF-IDF.
3. Logistic Regression predicts scam probability.
4. Rule-based analysis checks for:
   - OTP
   - Prize
   - Bank
   - Urgent
   - Click
   - Verify
5. Final risk level is generated.

---

### URL Scanner

Checks for:

- Suspicious domains
- Fake login pages
- HTTP links
- Raw IP URLs
- Phishing keywords

---

### Phone Scanner

Checks for:

- Fraud patterns
- Spam indicators
- Suspicious prefixes

---

### UPI Scanner

Checks:

- Invalid merchant IDs
- Fake UPI formats
- Scam keywords

---

## 🎯 Future Enhancements

- VirusTotal API integration
- Google Safe Browsing integration
- SMS spam detection
- Email phishing detection
- Browser extension
- Mobile application
- Real-time fraud reporting
- Community-driven blacklist database

---

## 👨‍💻 Team

Developed as an academic project focused on combining Artificial Intelligence and Cybersecurity to improve financial safety in digital transactions.

---

## 📚 Learning Outcomes

This project demonstrates practical experience with:

- Machine Learning
- Full Stack Development
- FastAPI
- React
- REST APIs
- Authentication
- AI Model Integration
- Cybersecurity Concepts
- Software Architecture

---

## 📄 License

This project was developed for educational and demonstration purposes.

---

# ⭐ Why FinDefender?

FinDefender demonstrates how AI can be combined with practical cybersecurity techniques to create a real-world fraud detection system. The project emphasizes clean architecture, modular design, explainable AI predictions, and a user-friendly interface, making it a strong showcase of full-stack development and machine learning integration.

## 📝 Note to Reviewers

This project was developed as an academic demonstration of AI-assisted financial fraud detection using the available time and resources. While the core features are functional, some modules may require further refinement, additional datasets, or external API integrations to improve detection accuracy and robustness.

We welcome feedback and suggestions for improvement. Given more development time and resources, the project can be extended into a production-ready solution with enhanced security, scalability, and real-time threat intelligence.
