import { RiskLevel, RiskCategory, ScanType } from '@/types';

interface AIResponse {
  content: string;
  suggestions?: string[];
}

const GREETINGS = [
  "Hello! I'm your Findefender AI assistant. How can I help you stay safe today?",
  "Hi there! I'm here to help you understand financial risks and avoid scams.",
  "Welcome! I can explain any scan results, risk scores, or answer questions about staying safe online.",
];

const SCAM_TIPS = [
  "Never share OTPs or passwords with anyone, even if they claim to be from your bank.",
  "Be wary of unsolicited messages offering prizes, investments, or urgent account issues.",
  "Always verify the sender's identity through official channels before taking action.",
  "Legitimate organizations won't pressure you to make immediate decisions.",
  "Check URLs carefully - scammers often use similar-looking domains.",
  "If an offer seems too good to be true, it probably is.",
  "Report suspicious activities to help protect others in the community.",
];

const RISK_EXPLANATIONS = {
  low: "A low risk score (0-39) indicates healthy online behavior. You've been making smart choices by avoiding suspicious links and scam messages. Keep it up!",
  medium: "A medium risk score (40-69) suggests some exposure to potentially risky content. This isn't alarming, but it's a good reminder to stay vigilant. Review your recent scans and be more cautious.",
  high: "A high risk score (70-100) indicates significant exposure to scams or suspicious content. This doesn't mean you've been scammed, but you should be extra careful. Consider reviewing all recent messages and transactions.",
};

const SCAN_TYPE_EXPLANATIONS = {
  message: "Message scanning analyzes text for common scam patterns like urgency language, financial claims, and pressure tactics. We check for keywords and patterns used by known scam operations.",
  url: "URL scanning examines web addresses for suspicious patterns, including fake domains, URL shorteners, IP addresses, and impersonation attempts. We also check against known malicious domain patterns.",
  phone: "Phone number scanning looks for patterns associated with scam calls, including premium rate numbers, spoofed formats, and numbers reported by other users.",
  upi: "UPI ID scanning checks for suspicious naming patterns, impersonation attempts, and formats commonly used by fraudsters to trick victims into sending money.",
};

export function getAIResponse(userMessage: string): AIResponse {
  const lowerMessage = userMessage.toLowerCase();

  // Greeting responses
  if (lowerMessage.match(/\b(hi|hello|hey|help|start)\b/)) {
    return {
      content: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
      suggestions: [
        "How do message scans work?",
        "What does my risk score mean?",
        "Give me some safety tips",
      ],
    };
  }

  // Risk score explanations
  if (lowerMessage.includes('risk score') || lowerMessage.includes('my score')) {
    return {
      content: "Your risk score is a number from 0-100 that reflects your exposure to potentially harmful content.\n\n" +
        "**Low (0-39):** Great! You're being careful online.\n" +
        "**Medium (40-69):** Some exposure to suspicious content. Stay alert.\n" +
        "**High (70-100):** Significant exposure. Review your recent activity.\n\n" +
        "Your score updates based on what you scan - encountering scams increases it, while safe scans gradually decrease it.",
      suggestions: [
        "How can I lower my risk score?",
        "What triggers high risk alerts?",
      ],
    };
  }

  // Scan explanations
  if (lowerMessage.includes('message scan') || lowerMessage.includes('how do scans work')) {
    return {
      content: "**How Message Scanning Works:**\n\n" + SCAN_TYPE_EXPLANATIONS.message + 
        "\n\nWe analyze:\n" +
        "• Urgency language ('act now', 'limited time')\n" +
        "• Financial claims ('won prize', 'guaranteed returns')\n" +
        "• Pressure tactics ('verify immediately')\n" +
        "• Impersonation attempts (fake bank/company names)\n\n" +
        "Results are rated as SAFE, SUSPICIOUS, or SCAM with a confidence percentage.",
      suggestions: [
        "How does URL scanning work?",
        "What should I do if something is flagged as SCAM?",
      ],
    };
  }

  if (lowerMessage.includes('url') || lowerMessage.includes('link scan')) {
    return {
      content: "**How URL Scanning Works:**\n\n" + SCAN_TYPE_EXPLANATIONS.url +
        "\n\nWe check for:\n" +
        "• Suspicious domain patterns\n" +
        "• URL shorteners (often used to hide destinations)\n" +
        "• IP addresses instead of domain names\n" +
        "• Impersonation keywords in domain\n" +
        "• Missing HTTPS security",
      suggestions: [
        "What makes a URL suspicious?",
        "How do phishing sites work?",
      ],
    };
  }

  // Safety tips
  if (lowerMessage.includes('tip') || lowerMessage.includes('safe') || lowerMessage.includes('protect')) {
    const tip1 = SCAM_TIPS[Math.floor(Math.random() * SCAM_TIPS.length)];
    let tip2 = SCAM_TIPS[Math.floor(Math.random() * SCAM_TIPS.length)];
    while (tip2 === tip1) {
      tip2 = SCAM_TIPS[Math.floor(Math.random() * SCAM_TIPS.length)];
    }
    
    return {
      content: "**Here are some important safety tips:**\n\n" +
        `🛡️ ${tip1}\n\n` +
        `🛡️ ${tip2}\n\n` +
        "Remember: Findefender is here to help you analyze suspicious content, but always trust your instincts and when in doubt, don't engage.",
      suggestions: [
        "More safety tips please",
        "What are common scam patterns?",
        "How to report a scam?",
      ],
    };
  }

  // Trade/Investment questions
  if (lowerMessage.includes('trade') || lowerMessage.includes('invest') || lowerMessage.includes('stock')) {
    return {
      content: "**Investment Safety with Findefender:**\n\n" +
        "Our Trade Analysis module helps you evaluate investment opportunities:\n\n" +
        "📊 **Technical Analysis:** We show SMA, EMA, RSI indicators for educational purposes.\n\n" +
        "⚠️ **Legitimacy Checks:** We verify if stocks are exchange-listed and check for pump-and-dump indicators.\n\n" +
        "🔍 **Scam Detection:** We analyze social media hype and look for signs of fraudulent promotions.\n\n" +
        "**Important:** This is for education only. We don't execute real trades or provide financial advice.",
      suggestions: [
        "What is a pump-and-dump?",
        "How do I spot fake investment schemes?",
      ],
    };
  }

  // Pump and dump explanation
  if (lowerMessage.includes('pump') || lowerMessage.includes('dump')) {
    return {
      content: "**What is a Pump-and-Dump Scheme?**\n\n" +
        "A pump-and-dump is a type of investment fraud where:\n\n" +
        "1. **The Pump:** Scammers buy large amounts of a cheap stock, then spread false hype through social media, emails, or fake 'expert' recommendations.\n\n" +
        "2. **The Dump:** Once the price rises from people buying in, the scammers sell their shares at the inflated price.\n\n" +
        "3. **The Crash:** Without the artificial demand, the price crashes, leaving victims with worthless shares.\n\n" +
        "**Red Flags:**\n" +
        "• Unsolicited investment 'tips'\n" +
        "• Guaranteed high returns\n" +
        "• Pressure to buy immediately\n" +
        "• Unknown or unlisted companies",
      suggestions: [
        "How to verify if a stock is legitimate?",
        "What are other investment scams?",
      ],
    };
  }

  // SCAM result explanation
  if (lowerMessage.includes('scam result') || lowerMessage.includes('flagged as scam')) {
    return {
      content: "**What to do when something is flagged as SCAM:**\n\n" +
        "1. **Don't Engage:** Do not respond to the message, click links, or call back.\n\n" +
        "2. **Don't Share Information:** Never provide personal details, passwords, or financial information.\n\n" +
        "3. **Block & Report:** Block the sender and report to relevant authorities.\n\n" +
        "4. **Warn Others:** Share your experience to help others avoid the same scam.\n\n" +
        "5. **Monitor Accounts:** If you've already engaged, monitor your financial accounts for unusual activity.",
      suggestions: [
        "How to report scams?",
        "What if I already clicked a link?",
      ],
    };
  }

  // Default response
  return {
    content: "I can help you understand:\n\n" +
      "• **Scan Results:** Why something was flagged as suspicious or scam\n" +
      "• **Risk Scores:** What your score means and how to improve it\n" +
      "• **Safety Tips:** Best practices for avoiding scams\n" +
      "• **Trade Analysis:** Understanding investment risks\n\n" +
      "What would you like to know more about?",
    suggestions: [
      "How do scans work?",
      "What is my risk score?",
      "Give me safety tips",
      "Explain investment scams",
    ],
  };
}

export function explainScanResult(type: ScanType, riskLevel: RiskLevel, indicators: string[]): string {
  const levelExplanation = {
    SAFE: "This appears to be safe based on our analysis.",
    SUSPICIOUS: "We detected some concerning patterns that warrant caution.",
    SCAM: "This matches known scam patterns and is likely fraudulent.",
  };

  let explanation = `**${riskLevel} Result**\n\n${levelExplanation[riskLevel]}\n\n`;
  
  if (indicators.length > 0) {
    explanation += "**What we found:**\n";
    indicators.forEach(indicator => {
      explanation += `• ${indicator}\n`;
    });
  }

  explanation += `\n**About ${type} scans:** ${SCAN_TYPE_EXPLANATIONS[type]}`;

  return explanation;
}
