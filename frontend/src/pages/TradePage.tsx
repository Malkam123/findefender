async function fetchStock(symbol: string) {
  const res = await fetch(`http://127.0.0.1:8000/stock/${symbol}`);
  if (!res.ok) throw new Error("Backend not responding");
  return res.json();
}

async function fetchRealtime(symbol: string) {
  const res = await fetch(`http://127.0.0.1:8000/stock/realtime/${symbol}`);
  if (!res.ok) throw new Error("Realtime backend error");
  return res.json();
}

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Activity,
  Shield,
  DollarSign,
  Loader2,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RiskBadge } from '@/components/ui/risk-badge';
import { CircularRiskMeter } from '@/components/ui/risk-meter';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {mockStocks, generatePriceHistory } from '@/lib/mock-data';
import { Stock, StockAnalysis } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function TradePage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedStock, setSelectedStock] = React.useState<Stock | null>(null);
  const [analysis, setAnalysis] = React.useState<StockAnalysis | null>(null);
  const [priceData, setPriceData] = React.useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [tradeDialog, setTradeDialog] = React.useState<{ open: boolean; action: 'BUY' | 'SELL' }>({ 
    open: false, 
    action: 'BUY' 
  });
  const [quantity, setQuantity] = React.useState('10');

  // ✅ REAL TIME PRICE UPDATE
  React.useEffect(() => {
    if (!selectedStock) return;

    const interval = setInterval(async () => {
      try {
        const data = await fetchStock(selectedStock.symbol);
        setSelectedStock(prev => prev ? { ...prev, price: data.finnhub_price } : prev);
      } catch (e) {
        console.error("Realtime error:", e);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedStock?.symbol]);

  const filteredStocks = mockStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelectStock = async (stock: Stock) => {
    setSelectedStock(stock);
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const data = await fetchStock(stock.symbol);
      const stockAnalysis: any = {
        riskScore: data.legitimacy_score,
        legitimacyScore: data.legitimacy_score,
        riskLevel:
          data.legitimacy_score >= 70 ? "low" :
          data.legitimacy_score >= 40 ? "medium" : "high",
        isExchangeListed: true,
        regulatoryPresence: true,
        socialHypeScore: 50,
        pumpDumpRisk: 100 - data.legitimacy_score,
        scamReportCount: data.legitimacy_score < 50 ? 5 : 0,
        technicalIndicators: {
          sma: data.finnhub_price,
          ema: data.alpha_price,
          rsi: 50,
          volumeTrend: "normal"
        },
        explanation:
          data.status === "LEGIT"
            ? "Price verified using Finnhub + AlphaVantage"
            : "Price mismatch detected between APIs",
        warnings:
          data.status === "RISKY"
            ? ["Possible pump & dump or fake stock"]
            : []
      };
      setAnalysis(stockAnalysis);
      setPriceData(generatePriceHistory(stock.price)); // chart stays fake (UI only)
    } catch (err) {
      console.error(err);
      alert("Backend API not working");
    }
    setIsAnalyzing(false);
    }

    const handleTrade = (action: 'BUY' | 'SELL') => {
      if (!analysis) return;

      if (analysis.riskScore >= 50) {
        setTradeDialog({ open: true, action });
      } else {
        executeTrade(action);
      }
    };

    const executeTrade = (action: 'BUY' | 'SELL') => {
      toast({
        title: `${action} Order Simulated`,
        description: `Successfully simulated ${action.toLowerCase()} order for ${quantity} shares of ${selectedStock?.symbol}. This is for educational purposes only.`,
      });
      setTradeDialog({ open: false, action: 'BUY' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Trade & Stock Analysis</h1>
        <p className="text-muted-foreground">Analyze stocks for legitimacy and investment risks</p>
      </div>

      {/* Disclaimer */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Educational Tool:</strong> This module simulates trading analysis for learning purposes. 
          It does not execute real trades or provide financial advice.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stock Search */}
        <div className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-base">Search Stocks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search symbol or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredStocks.map((stock) => (
                  <motion.div
                    key={stock.symbol}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => handleSelectStock(stock)}
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-colors",
                        selectedStock?.symbol === stock.symbol 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{stock.symbol}</p>
                          <p className={cn(
                            "text-xs",
                            selectedStock?.symbol === stock.symbol 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          )}>
                            {stock.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${stock.price.toFixed(2)}</p>
                          <p className={cn(
                            "text-xs flex items-center gap-1",
                            stock.change >= 0 ? "text-success" : "text-danger"
                          )}>
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Details & Chart */}
        <div className="lg:col-span-2 space-y-6">
          {!selectedStock ? (
            <Card variant="elevated" className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="font-medium">Select a stock to analyze</p>
                <p className="text-sm">Choose from the list on the left</p>
              </div>
            </Card>
          ) : (
            <>
              {/* Stock Header */}
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">{selectedStock.symbol}</h2>
                        <span className="text-muted-foreground">{selectedStock.name}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-3xl font-bold">${selectedStock.price.toFixed(2)}</span>
                        <span className={cn(
                          "flex items-center gap-1 font-semibold",
                          selectedStock.change >= 0 ? "text-success" : "text-danger"
                        )}>
                          {selectedStock.change >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {selectedStock.change >= 0 ? '+' : ''}${selectedStock.change.toFixed(2)} 
                          ({selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="success" 
                        size="lg"
                        onClick={() => handleTrade('BUY')}
                        disabled={isAnalyzing}
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Buy
                      </Button>
                      <Button 
                        variant="danger" 
                        size="lg"
                        onClick={() => handleTrade('SELL')}
                        disabled={isAnalyzing}
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Sell
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Chart */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-base">Price History (30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  {isAnalyzing ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={priceData}>
                          <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 10 }} 
                            tickFormatter={(v) => v.slice(5)}
                            className="text-muted-foreground"
                          />
                          <YAxis 
                            tick={{ fontSize: 10 }} 
                            domain={['auto', 'auto']}
                            className="text-muted-foreground"
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="price" 
                            stroke="hsl(var(--primary))" 
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Risk Analysis */}
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card 
                    variant="risk" 
                    className={cn(
                      analysis.riskLevel === 'low' && 'border-l-success',
                      analysis.riskLevel === 'medium' && 'border-l-warning',
                      analysis.riskLevel === 'high' && 'border-l-danger',
                    )}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Risk & Legitimacy Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-6">
                        {/* Risk Score */}
                        <div className="flex flex-col items-center">
                          <CircularRiskMeter score={analysis.riskScore} size={120} />
                          <p className="text-sm text-muted-foreground mt-2">Investor Risk Score</p>
                        </div>

                        {/* Key Metrics */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Exchange Listed</p>
                            <p className="font-semibold flex items-center gap-1">
                              {analysis.isExchangeListed ? (
                                <><CheckCircle className="h-4 w-4 text-success" /> Yes</>
                              ) : (
                                <><XCircle className="h-4 w-4 text-danger" /> No</>
                              )}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Regulatory Presence</p>
                            <p className="font-semibold flex items-center gap-1">
                              {analysis.regulatoryPresence ? (
                                <><CheckCircle className="h-4 w-4 text-success" /> Verified</>
                              ) : (
                                <><AlertTriangle className="h-4 w-4 text-warning" /> Unknown</>
                              )}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Social Hype Score</p>
                            <p className="font-semibold">{analysis.socialHypeScore}%</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Pump-Dump Risk</p>
                            <p className={cn(
                              "font-semibold",
                              analysis.pumpDumpRisk < 30 ? "text-success" : 
                              analysis.pumpDumpRisk < 60 ? "text-warning" : "text-danger"
                            )}>
                              {analysis.pumpDumpRisk}%
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Legitimacy Score</p>
                            <p className="font-semibold text-success">{analysis.legitimacyScore}%</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Scam Reports</p>
                            <p className="font-semibold">{analysis.scamReportCount}</p>
                          </div>
                        </div>

                        {/* Technical Indicators */}
                        <div className="space-y-3">
                          <p className="text-sm font-medium">Technical Indicators</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">SMA</span>
                              <span className="font-medium">${analysis.technicalIndicators.sma.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">EMA</span>
                              <span className="font-medium">${analysis.technicalIndicators.ema.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">RSI</span>
                              <span className={cn(
                                "font-medium",
                                analysis.technicalIndicators.rsi < 30 ? "text-success" :
                                analysis.technicalIndicators.rsi > 70 ? "text-danger" : ""
                              )}>
                                {analysis.technicalIndicators.rsi.toFixed(1)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Volume</span>
                              <span className="font-medium capitalize">{analysis.technicalIndicators.volumeTrend}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Explanation */}
                      <div className="mt-6 p-4 rounded-lg bg-muted/50">
                        <p className="text-sm font-medium mb-2">AI Analysis</p>
                        <p className="text-sm text-muted-foreground">{analysis.explanation}</p>
                        {analysis.warnings.length > 0 && (
                          <div className="mt-3 space-y-1">
                            {analysis.warnings.map((warning, idx) => (
                              <p key={idx} className="text-sm text-warning flex items-center gap-2">
                                <AlertTriangle className="h-3 w-3" />
                                {warning}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Trade Warning Dialog */}
      <Dialog open={tradeDialog.open} onOpenChange={(open) => setTradeDialog({ ...tradeDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              High Risk Warning
            </DialogTitle>
            <DialogDescription>
              This stock has an elevated risk score of <strong>{analysis?.riskScore}</strong>. 
              Our analysis has detected potential concerns including:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2">
            {analysis?.warnings.map((warning, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 rounded bg-warning/10 text-warning text-sm">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                {warning}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setTradeDialog({ open: false, action: 'BUY' })}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              variant="warning" 
              onClick={() => executeTrade(tradeDialog.action)}
              className="w-full sm:w-auto"
            >
              Proceed Anyway (Simulation)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
