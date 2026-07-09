import React from 'react';
import { cn } from '@/lib/utils';

interface RiskMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function RiskMeter({ score, size = 'md', showLabel = true, className }: RiskMeterProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  
  const getColor = () => {
    if (clampedScore < 40) return 'bg-success';
    if (clampedScore < 70) return 'bg-warning';
    return 'bg-danger';
  };

  const getLabel = () => {
    if (clampedScore < 40) return 'Low Risk';
    if (clampedScore < 70) return 'Medium Risk';
    return 'High Risk';
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
          <span className={cn(
            'text-sm font-bold',
            clampedScore < 40 && 'text-success',
            clampedScore >= 40 && clampedScore < 70 && 'text-warning',
            clampedScore >= 70 && 'text-danger',
          )}>
            {clampedScore}/100
          </span>
        </div>
      )}
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', getColor())}
          style={{ width: `${clampedScore}%` }}
        />
      </div>
      {showLabel && (
        <p className={cn(
          'text-xs mt-1 font-medium',
          clampedScore < 40 && 'text-success',
          clampedScore >= 40 && clampedScore < 70 && 'text-warning',
          clampedScore >= 70 && 'text-danger',
        )}>
          {getLabel()}
        </p>
      )}
    </div>
  );
}

interface CircularRiskMeterProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

export function CircularRiskMeter({ 
  score, 
  size = 120, 
  strokeWidth = 10,
  showLabel = true,
  className 
}: CircularRiskMeterProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedScore / 100) * circumference;

  const getColor = () => {
    if (clampedScore < 40) return 'stroke-success';
    if (clampedScore < 70) return 'stroke-warning';
    return 'stroke-danger';
  };

  const getLabel = () => {
    if (clampedScore < 40) return 'Low';
    if (clampedScore < 70) return 'Medium';
    return 'High';
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('transition-all duration-700 ease-out', getColor())}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn(
            'text-2xl font-bold',
            clampedScore < 40 && 'text-success',
            clampedScore >= 40 && clampedScore < 70 && 'text-warning',
            clampedScore >= 70 && 'text-danger',
          )}>
            {clampedScore}
          </span>
          <span className="text-xs text-muted-foreground">{getLabel()}</span>
        </div>
      )}
    </div>
  );
}
