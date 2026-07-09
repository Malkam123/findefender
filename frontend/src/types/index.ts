// User & Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  riskScore: number;
  createdAt: string;
}

// Scan Types
export type ScanType = 'message' | 'url' | 'phone' | 'upi';
export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'SCAM';
export type RiskCategory = 'low' | 'medium' | 'high';

export interface ScanResult {
  id: string;
  userId: string;
  type: ScanType;
  input: string;
  riskLevel: RiskLevel;
  confidence: number;
  explanation: string;
  indicators: string[];
  createdAt: string;
}

// Trade Types
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
}

export interface StockAnalysis {
  symbol: string;
  technicalIndicators: {
    sma: number;
    ema: number;
    rsi: number;
    volumeTrend: 'increasing' | 'decreasing' | 'stable';
  };
  legitimacyScore: number;
  riskScore: number;
  riskLevel: RiskCategory;
  isExchangeListed: boolean;
  regulatoryPresence: boolean;
  socialHypeScore: number;
  pumpDumpRisk: number;
  scamReportCount: number;
  explanation: string;
  warnings: string[];
}

export interface TradeSimulation {
  id: string;
  userId: string;
  symbol: string;
  action: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  riskScore: number;
  warnings: string[];
  createdAt: string;
}

// Alert Types
export interface Alert {
  id: string;
  userId: string;
  type: 'scan' | 'trade' | 'risk';
  severity: RiskCategory;
  title: string;
  description: string;
  isResolved: boolean;
  createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  highRiskUsers: number;
  totalScans: number;
  totalAlerts: number;
  scansToday: number;
  alertsToday: number;
}

// AI Chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
