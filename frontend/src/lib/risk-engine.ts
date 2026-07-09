import { RiskLevel, ScanType, RiskCategory } from '@/types';

// Scam detection patterns
const SCAM_PATTERNS = {
  urgency: ['urgent', 'immediately', 'act now', 'limited time', 'expires', 'hurry', 'don\'t wait'],
  financial: ['won', 'winner', 'prize', 'lottery', 'inheritance', 'million', 'bitcoin', 'crypto', 'guaranteed return'],
  pressure: ['verify now', 'confirm immediately', 'account suspended', 'security alert', 'unusual activity'],
  impersonation: ['bank', 'irs', 'government', 'amazon', 'paypal', 'netflix', 'microsoft'],
  links: ['click here', 'visit link', 'log in now', 'verify account'],
};

const SUSPICIOUS_DOMAINS = [
  'bit.ly', 'tinyurl', 'goo.gl', 'ow.ly', 't.co',
  '-secure', '-verify', '-login', '-account',
  'suspicious', 'phishing', 'scam'
];

const SUSPICIOUS_UPI_PATTERNS = [
  'lucky', 'winner', 'prize', 'gift', 'offer', 'deal',
  'cashback', 'reward', 'bonus', 'free'
];

interface ScanAnalysis {
  riskLevel: RiskLevel;
  confidence: number;
  explanation: string;
  indicators: string[];
}

export function analyzeMessage(message: string): ScanAnalysis {
  const lowerMessage = message.toLowerCase();
  const indicators: string[] = [];
  let riskScore = 0;

  // Check for scam patterns
  Object.entries(SCAM_PATTERNS).forEach(([category, patterns]) => {
    patterns.forEach(pattern => {
      if (lowerMessage.includes(pattern)) {
        riskScore += 15;
        indicators.push(`Contains ${category} language: "${pattern}"`);
      }
    });
  });

  // Check for excessive punctuation (common in scams)
  if ((message.match(/!/g) || []).length > 3) {
    riskScore += 10;
    indicators.push('Excessive exclamation marks');
  }

  // Check for ALL CAPS
  const capsRatio = (message.match(/[A-Z]/g) || []).length / message.length;
  if (capsRatio > 0.5 && message.length > 10) {
    riskScore += 10;
    indicators.push('Excessive use of capital letters');
  }

  // Calculate confidence and risk level
  const confidence = Math.min(95, 50 + riskScore);
  let riskLevel: RiskLevel = 'SAFE';
  let explanation = 'This message appears to be safe. No significant scam indicators detected.';

  if (riskScore >= 40) {
    riskLevel = 'SCAM';
    explanation = 'This message contains multiple scam indicators including urgency language, suspicious claims, and pressure tactics. Do not respond or click any links.';
  } else if (riskScore >= 20) {
    riskLevel = 'SUSPICIOUS';
    explanation = 'This message has some suspicious characteristics. Proceed with caution and verify the sender before taking any action.';
  }

  return { riskLevel, confidence, explanation, indicators };
}

export function analyzeUrl(url: string): ScanAnalysis {
  const lowerUrl = url.toLowerCase();
  const indicators: string[] = [];
  let riskScore = 0;

  // Check for URL shorteners
  SUSPICIOUS_DOMAINS.forEach(domain => {
    if (lowerUrl.includes(domain)) {
      riskScore += 25;
      indicators.push(`Suspicious domain pattern: ${domain}`);
    }
  });

  // Check for HTTP (not HTTPS)
  if (lowerUrl.startsWith('http://')) {
    riskScore += 15;
    indicators.push('Insecure HTTP connection');
  }

  // Check for IP address instead of domain
  if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
    riskScore += 30;
    indicators.push('Uses IP address instead of domain name');
  }

  // Check for suspicious keywords in domain
  const suspiciousKeywords = ['login', 'secure', 'verify', 'account', 'bank', 'paypal'];
  suspiciousKeywords.forEach(keyword => {
    if (lowerUrl.includes(keyword) && !lowerUrl.includes('.com/' + keyword)) {
      riskScore += 10;
      indicators.push(`Suspicious keyword in domain: ${keyword}`);
    }
  });

  // Check for excessive subdomains
  const subdomainCount = (url.match(/\./g) || []).length;
  if (subdomainCount > 4) {
    riskScore += 15;
    indicators.push('Excessive subdomains');
  }

  const confidence = Math.min(95, 50 + riskScore);
  let riskLevel: RiskLevel = 'SAFE';
  let explanation = 'This URL appears to be legitimate. No significant security concerns detected.';

  if (riskScore >= 40) {
    riskLevel = 'SCAM';
    explanation = 'This URL shows multiple red flags including suspicious domain patterns and potential phishing indicators. Do not visit this link.';
  } else if (riskScore >= 20) {
    riskLevel = 'SUSPICIOUS';
    explanation = 'This URL has some concerning characteristics. Verify the destination before proceeding.';
  }

  return { riskLevel, confidence, explanation, indicators };
}

export function analyzePhone(phone: string): ScanAnalysis {
  const cleanPhone = phone.replace(/\D/g, '');
  const indicators: string[] = [];
  let riskScore = 0;

  // Check for unusually short/long numbers
  if (cleanPhone.length < 10 || cleanPhone.length > 15) {
    riskScore += 20;
    indicators.push('Unusual phone number length');
  }

  // Check for repeated patterns (common in spoofed numbers)
  if (/(\d)\1{4,}/.test(cleanPhone)) {
    riskScore += 25;
    indicators.push('Suspicious repeating digit pattern');
  }

  // Check for premium rate number patterns
  const premiumPatterns = ['900', '976', '070', '084', '087'];
  premiumPatterns.forEach(pattern => {
    if (cleanPhone.startsWith(pattern) || cleanPhone.substring(3).startsWith(pattern)) {
      riskScore += 30;
      indicators.push(`Premium rate number pattern: ${pattern}`);
    }
  });

  // Check for international premium patterns
  if (cleanPhone.startsWith('011') || cleanPhone.startsWith('+')) {
    riskScore += 10;
    indicators.push('International number - verify source');
  }

  const confidence = Math.min(90, 45 + riskScore);
  let riskLevel: RiskLevel = 'SAFE';
  let explanation = 'This phone number does not match known scam patterns.';

  if (riskScore >= 40) {
    riskLevel = 'SCAM';
    explanation = 'This phone number matches known scam patterns including premium rate indicators or spoofing characteristics. Do not call or respond.';
  } else if (riskScore >= 20) {
    riskLevel = 'SUSPICIOUS';
    explanation = 'This phone number has some unusual characteristics. Verify the caller before sharing any information.';
  }

  return { riskLevel, confidence, explanation, indicators };
}

export function analyzeUpi(upiId: string): ScanAnalysis {
  const lowerUpi = upiId.toLowerCase();
  const indicators: string[] = [];
  let riskScore = 0;

  // Check for suspicious patterns in UPI ID
  SUSPICIOUS_UPI_PATTERNS.forEach(pattern => {
    if (lowerUpi.includes(pattern)) {
      riskScore += 20;
      indicators.push(`Suspicious keyword: ${pattern}`);
    }
  });

  // Check for random string patterns (potential fake merchants)
  if (/[a-z0-9]{10,}@/.test(lowerUpi)) {
    riskScore += 15;
    indicators.push('Random character pattern detected');
  }

  // Check for unofficial UPI handles
  const officialHandles = ['@upi', '@paytm', '@okicici', '@ybl', '@okhdfcbank', '@oksbi'];
  const hasOfficialHandle = officialHandles.some(handle => lowerUpi.includes(handle));
  if (!hasOfficialHandle) {
    riskScore += 10;
    indicators.push('Non-standard UPI handle');
  }

  // Check for impersonation attempts
  const impersonationPatterns = ['official', 'verified', 'genuine', 'real', 'authentic'];
  impersonationPatterns.forEach(pattern => {
    if (lowerUpi.includes(pattern)) {
      riskScore += 25;
      indicators.push(`Impersonation indicator: ${pattern}`);
    }
  });

  const confidence = Math.min(90, 50 + riskScore);
  let riskLevel: RiskLevel = 'SAFE';
  let explanation = 'This UPI ID appears to be legitimate with no major red flags.';

  if (riskScore >= 40) {
    riskLevel = 'SCAM';
    explanation = 'This UPI ID shows significant scam indicators including suspicious naming patterns and potential impersonation. Do not make payments to this ID.';
  } else if (riskScore >= 20) {
    riskLevel = 'SUSPICIOUS';
    explanation = 'This UPI ID has some concerning patterns. Verify the recipient before making any payments.';
  }

  return { riskLevel, confidence, explanation, indicators };
}

export function analyzeInput(type: ScanType, input: string): ScanAnalysis {
  switch (type) {
    case 'message':
      return analyzeMessage(input);
    case 'url':
      return analyzeUrl(input);
    case 'phone':
      return analyzePhone(input);
    case 'upi':
      return analyzeUpi(input);
    default:
      return {
        riskLevel: 'SAFE',
        confidence: 50,
        explanation: 'Unable to analyze this input type.',
        indicators: [],
      };
  }
}

export function calculateUserRiskScore(
  currentScore: number,
  scanRiskLevel: RiskLevel
): number {
  let adjustment = 0;
  switch (scanRiskLevel) {
    case 'SCAM':
      adjustment = 10;
      break;
    case 'SUSPICIOUS':
      adjustment = 5;
      break;
    case 'SAFE':
      adjustment = -2;
      break;
  }
  return Math.max(0, Math.min(100, currentScore + adjustment));
}

export function getRiskCategory(score: number): RiskCategory {
  if (score < 40) return 'low';
  if (score < 70) return 'medium';
  return 'high';
}

export function getRiskColor(level: RiskLevel | RiskCategory): string {
  switch (level) {
    case 'SAFE':
    case 'low':
      return 'text-success';
    case 'SUSPICIOUS':
    case 'medium':
      return 'text-warning';
    case 'SCAM':
    case 'high':
      return 'text-danger';
    default:
      return 'text-muted-foreground';
  }
}

export function getRiskBgColor(level: RiskLevel | RiskCategory): string {
  switch (level) {
    case 'SAFE':
    case 'low':
      return 'bg-success/10';
    case 'SUSPICIOUS':
    case 'medium':
      return 'bg-warning/10';
    case 'SCAM':
    case 'high':
      return 'bg-danger/10';
    default:
      return 'bg-muted';
  }
}
