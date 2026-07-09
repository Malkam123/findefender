import React from 'react';
import { Users, AlertTriangle, Scan, Shield, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskBadge } from '@/components/ui/risk-badge';
import { mockDashboardStats, mockAlerts, mockUsers } from '@/lib/mock-data';

const stats = [
  { label: 'Total Users', value: mockDashboardStats.totalUsers, icon: Users, color: 'text-primary' },
  { label: 'High Risk Users', value: mockDashboardStats.highRiskUsers, icon: AlertTriangle, color: 'text-danger' },
  { label: 'Total Scans', value: mockDashboardStats.totalScans, icon: Scan, color: 'text-success' },
  { label: 'Active Alerts', value: mockDashboardStats.totalAlerts, icon: Shield, color: 'text-warning' },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor users, alerts, and system health</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="elevated">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-50`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card variant="elevated">
          <CardHeader><CardTitle>Recent Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="p-3 rounded-lg bg-muted/50 flex items-start gap-3">
                <RiskBadge riskLevel={alert.severity} size="sm" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader><CardTitle>High Risk Users</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockUsers.filter(u => u.riskScore >= 50).map((user) => (
              <div key={user.id} className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <RiskBadge riskLevel={user.riskScore >= 70 ? 'high' : 'medium'} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
