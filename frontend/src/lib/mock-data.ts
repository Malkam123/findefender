import { User, ScanResult, Stock, StockAnalysis, Alert, DashboardStats, TradeSimulation } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  { id: '1', email: 'user@findefender.com', name: 'John Doe', role: 'USER', riskScore: 25, createdAt: '2024-01-15' },
  { id: '2', email: 'admin@findefender.com', name: 'Admin User', role: 'ADMIN', riskScore: 0, createdAt: '2024-01-01' },
  { id: '3', email: 'jane@example.com', name: 'Jane Smith', role: 'USER', riskScore: 65, createdAt: '2024-02-10' },
  { id: '4', email: 'mike@example.com', name: 'Mike Johnson', role: 'USER', riskScore: 85, createdAt: '2024-02-20' },
];

// Mock Scan Results
export const mockScanResults: ScanResult[] = [
  {
    id: '1',
    userId: '1',
    type: 'message',
    input: 'URGENT: You won $50,000! Click here to claim now!',
    riskLevel: 'SCAM',
    confidence: 95,
    explanation: 'This message contains classic scam indicators including urgency language, unexpected prize claims, and pressure to take immediate action.',
    indicators: ['Urgency language', 'Prize claim', 'No sender verification'],
    createdAt: '2024-03-01T10:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    type: 'url',
    input: 'https://secure-bank-verify.suspicious.com',
    riskLevel: 'SUSPICIOUS',
    confidence: 78,
    explanation: 'This domain uses security-related terms but is not an official banking domain. Exercise caution.',
    indicators: ['Suspicious domain', 'Impersonation attempt'],
    createdAt: '2024-03-02T14:20:00Z'
  },
];

// Mock Stocks
export const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.50, change: 2.35, changePercent: 1.33, volume: 58234000, marketCap: '2.8T', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.20, change: -0.85, changePercent: -0.60, volume: 22145000, marketCap: '1.8T', sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.80, change: 8.20, changePercent: 3.45, volume: 89234000, marketCap: '780B', sector: 'Automotive' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.30, change: 15.40, changePercent: 1.79, volume: 45123000, marketCap: '2.1T', sector: 'Technology' },
];

// Mock Stock Analysis
export const generateStockAnalysis = (symbol: string): StockAnalysis => {
  const riskScore = Math.floor(Math.random() * 60) + 20;
  return {
    symbol,
    technicalIndicators: {
      sma: 165 + Math.random() * 20,
      ema: 168 + Math.random() * 15,
      rsi: 40 + Math.random() * 30,
      volumeTrend: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)] as 'increasing' | 'decreasing' | 'stable',
    },
    legitimacyScore: 85 + Math.floor(Math.random() * 15),
    riskScore,
    riskLevel: riskScore < 40 ? 'low' : riskScore < 70 ? 'medium' : 'high',
    isExchangeListed: true,
    regulatoryPresence: true,
    socialHypeScore: Math.floor(Math.random() * 40) + 30,
    pumpDumpRisk: Math.floor(Math.random() * 30),
    scamReportCount: Math.floor(Math.random() * 5),
    explanation: `${symbol} shows ${riskScore < 40 ? 'healthy' : riskScore < 70 ? 'moderate' : 'elevated'} risk indicators. Technical analysis suggests ${riskScore < 50 ? 'stable trading patterns' : 'some volatility concerns'}.`,
    warnings: riskScore > 50 ? ['Higher than average volatility detected', 'Unusual trading volume patterns'] : [],
  };
};

// Mock Alerts
export const mockAlerts: Alert[] = [
  { id: '1', userId: '4', type: 'scan', severity: 'high', title: 'Multiple Scam Scans Detected', description: 'User has scanned 5 confirmed scam messages in the past 24 hours', isResolved: false, createdAt: '2024-03-10T08:00:00Z' },
  { id: '2', userId: '3', type: 'trade', severity: 'medium', title: 'High-Risk Trade Attempted', description: 'User attempted to simulate trade on high-risk stock', isResolved: false, createdAt: '2024-03-10T09:30:00Z' },
  { id: '3', userId: '1', type: 'risk', severity: 'low', title: 'Risk Score Updated', description: 'User risk score increased to 25 based on recent activity', isResolved: true, createdAt: '2024-03-09T16:45:00Z' },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalUsers: 1247,
  highRiskUsers: 23,
  totalScans: 15834,
  totalAlerts: 156,
  scansToday: 342,
  alertsToday: 8,
};

// Mock Trade Simulations
export const mockTradeSimulations: TradeSimulation[] = [
  { id: '1', userId: '1', symbol: 'AAPL', action: 'BUY', quantity: 10, price: 178.50, riskScore: 25, warnings: [], createdAt: '2024-03-08T10:00:00Z' },
  { id: '2', userId: '3', symbol: 'TSLA', action: 'BUY', quantity: 5, price: 245.80, riskScore: 55, warnings: ['Higher volatility stock'], createdAt: '2024-03-09T14:30:00Z' },
];

// Price history for charts
export const generatePriceHistory = (basePrice: number, days: number = 30) => {
  const data = [];
  let price = basePrice;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    price = price + (Math.random() - 0.48) * (basePrice * 0.03);
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 10000000) + 5000000,
    });
  }
  return data;
};
