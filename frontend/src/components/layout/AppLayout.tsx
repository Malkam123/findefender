import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      {/* Footer Disclaimer */}
      <footer className="border-t border-border mt-auto py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-xs text-center text-muted-foreground">
            <strong>Disclaimer:</strong> This platform provides risk analysis and educational insights only. 
            It does not execute payments, trades, or provide financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
