import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Scan, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiskBadge } from '@/components/ui/risk-badge';
import { CircularRiskMeter } from '@/components/ui/risk-meter';
import { Link } from 'react-router-dom';
import { mockScanResults, mockAlerts, mockDashboardStats } from '@/lib/mock-data';

const stats = [
  { 
    label: 'Total Scans', 
    value: '24', 
    change: '+8 this week',
    trend: 'up',
    icon: Scan,
    color: 'text-primary'
  },
  { 
    label: 'Threats Detected', 
    value: '3', 
    change: '-2 from last week',
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-warning'
  },
  { 
    label: 'Safe Scans', 
    value: '21', 
    change: '+10 this week',
    trend: 'up',
    icon: Shield,
    color: 'text-success'
  },
  { 
    label: 'Trade Analyses', 
    value: '5', 
    change: '+2 this week',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-primary'
  },
];

export default function DashboardPage() {
  const userRiskScore = 25;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your security overview.</p>
        </div>
        <Link to="/scan">
          <Button variant="hero" className="gap-2">
            <Scan className="h-4 w-4" />
            New Scan
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="elevated" className="relative overflow-hidden">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 text-success" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-danger" />
                      )}
                      <span className="text-xs text-muted-foreground">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Risk Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="elevated" className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Your Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CircularRiskMeter score={userRiskScore} size={160} strokeWidth={12} />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Your risk score is calculated based on your scan history and online behavior patterns.
              </p>
              <Link to="/assistant" className="mt-4">
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card variant="elevated" className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-primary" />
                Recent Scans
              </CardTitle>
              <Link to="/scan">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockScanResults.slice(0, 3).map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium capitalize">{scan.type} Scan</span>
                        <RiskBadge riskLevel={scan.riskLevel} size="sm" />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{scan.input}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(scan.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{scan.confidence}%</p>
                      <p className="text-xs text-muted-foreground">confidence</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">Start protecting yourself now</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/scan">
                  <Button variant="scan" className="gap-2">
                    <Scan className="h-4 w-4" />
                    Scan Message
                  </Button>
                </Link>
                <Link to="/trade">
                  <Button variant="outline" className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Analyze Stock
                  </Button>
                </Link>
                <Link to="/assistant">
                  <Button variant="ghost" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Ask AI
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
