import React from 'react';
import { User, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CircularRiskMeter } from '@/components/ui/risk-meter';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState(true);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Profile & Settings</h1>

      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">JD</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-muted-foreground">user@findefender.com</p>
            </div>
            <CircularRiskMeter score={25} size={80} />
          </div>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader><CardTitle className="text-base">Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span>Push Notifications</span>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>Privacy & Security</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardContent className="p-6">
          <p className="text-xs text-muted-foreground mb-4">
            <strong>Disclaimer:</strong> This platform provides risk analysis and educational insights only. It does not execute payments, trades, or provide financial advice.
          </p>
          <Button variant="outline" className="w-full gap-2" onClick={() => navigate('/')}>
            <LogOut className="h-4 w-4" />Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}