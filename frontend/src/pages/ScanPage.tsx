import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Link2, 
  Phone, 
  CreditCard,
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  History
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RiskBadge } from '@/components/ui/risk-badge';
import { RiskMeter } from '@/components/ui/risk-meter';
import { ScanType, RiskLevel, ScanResult } from '@/types';
import { cn } from '@/lib/utils';
import { apiFetch } from "@/lib/api";



const scanTypes = [
  { id: 'message', label: 'Message', icon: MessageSquare, placeholder: 'Paste the suspicious message here...' },
  { id: 'url', label: 'URL', icon: Link2, placeholder: 'https://suspicious-link.com' },
  { id: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 234 567 8900' },
  { id: 'upi', label: 'UPI ID', icon: CreditCard, placeholder: 'merchant@upi' },
] as const;

export default function ScanPage() {
  const [activeTab, setActiveTab] = React.useState<ScanType>('message');
  const [input, setInput] = React.useState('');
  const [isScanning, setIsScanning] = React.useState(false);
  const [result, setResult] = React.useState<{
    riskLevel: RiskLevel;
    confidence: number;
    explanation: string;
    indicators: string[];
  } | null>(null);
  const [scanHistory, setScanHistory] = React.useState<ScanResult[]>([]);
  const API_BASE = import.meta.env.VITE_API_URL;


  const handleScan = async () => {
    if (!input.trim()) return;

    setIsScanning(true);
    setResult(null);

    try {
      const urlMap = {
        message: "/scan/message",
        url: "/scan/url",
        phone: "/scan/phone",
        upi: "/scan/upi",
      };

      const bodyMap = {
        message: { message: input },
        url: { url: input },
        phone: { phone: input },
        upi: { upi: input },
      };

      const data = await apiFetch(urlMap[activeTab], bodyMap[activeTab]);


      const resultData = {
        riskLevel: data.risk_level || "SAFE",
        confidence: data.confidence || 80,
        explanation: data.explanation || "Scanned using backend API",
        indicators: data.indicators || []
      };

      setResult(resultData);

      const newScan = {
        id: Date.now().toString(),
        userId: "1",
        type: activeTab,
        input: input,
        riskLevel: resultData.riskLevel,
        confidence: resultData.confidence,
        explanation: resultData.explanation,
        indicators: resultData.indicators,
        createdAt: new Date().toISOString(),
      };

      setScanHistory(prev => [newScan, ...prev].slice(0, 10));

    } catch (err) {
      console.error("Scan failed:", err);
      alert("Backend not running!");
    }

    setIsScanning(false);
  };


  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const getResultIcon = () => {
    if (!result) return null;
    switch (result.riskLevel) {
      case 'SAFE':
        return <CheckCircle className="h-16 w-16 text-success" />;
      case 'SUSPICIOUS':
        return <AlertTriangle className="h-16 w-16 text-warning" />;
      case 'SCAM':
        return <XCircle className="h-16 w-16 text-danger" />;
    }
  };

  const activeType = scanTypes.find(t => t.id === activeTab)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Multi-Scan Protection</h1>
        <p className="text-muted-foreground">Scan messages, URLs, phone numbers, and payment IDs for scams</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Scan Input */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>What would you like to scan?</CardTitle>
              <CardDescription>Select the type of content you want to analyze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as ScanType); handleClear(); }}>
                <TabsList className="grid grid-cols-4 w-full">
                  {scanTypes.map((type) => (
                    <TabsTrigger key={type.id} value={type.id} className="gap-2">
                      <type.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{type.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {scanTypes.map((type) => (
                  <TabsContent key={type.id} value={type.id} className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <type.icon className="h-4 w-4" />
                        <span>Enter the {type.label.toLowerCase()} you want to analyze</span>
                      </div>
                      {type.id === 'message' ? (
                        <Textarea
                          placeholder={type.placeholder}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          rows={5}
                          className="resize-none"
                        />
                      ) : (
                        <Input
                          placeholder={type.placeholder}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="flex items-center gap-3">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="gap-2 flex-1 sm:flex-none"
                  onClick={handleScan}
                  disabled={!input.trim() || isScanning}
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Scan Now
                    </>
                  )}
                </Button>
                {input && (
                  <Button variant="outline" onClick={handleClear}>
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card 
                  variant="risk" 
                  className={cn(
                    result.riskLevel === 'SAFE' && 'border-l-success',
                    result.riskLevel === 'SUSPICIOUS' && 'border-l-warning',
                    result.riskLevel === 'SCAM' && 'border-l-danger',
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-shrink-0 flex justify-center md:justify-start">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          {getResultIcon()}
                        </motion.div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <RiskBadge riskLevel={result.riskLevel} size="lg" />
                          <span className="text-lg font-semibold">{result.confidence}% Confidence</span>
                        </div>
                        
                        <p className="text-muted-foreground">{result.explanation}</p>

                        {result.indicators.length > 0 && (
                          <div className="space-y-2">
                            <p className="font-medium text-sm">Detection Indicators:</p>
                            <ul className="space-y-1">
                              {result.indicators.map((indicator, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-primary">•</span>
                                  {indicator}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0 w-full md:w-32">
                        <RiskMeter 
                          score={result.riskLevel === 'SAFE' ? 20 : result.riskLevel === 'SUSPICIOUS' ? 55 : 85} 
                          size="sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scan History */}
        <div>
          <Card variant="elevated" className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <History className="h-4 w-4" />
                Recent Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scanHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No scans yet</p>
                  <p className="text-xs">Your scan history will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scanHistory.map((scan) => (
                    <motion.div
                      key={scan.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => {
                        setActiveTab(scan.type);
                        setInput(scan.input);
                        setResult({
                          riskLevel: scan.riskLevel,
                          confidence: scan.confidence,
                          explanation: scan.explanation,
                          indicators: scan.indicators,
                        });
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium capitalize">{scan.type}</span>
                        <RiskBadge riskLevel={scan.riskLevel} size="sm" showIcon={false} />
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{scan.input}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
