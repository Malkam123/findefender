import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-danger/10 text-danger",
        outline: "border border-current bg-transparent",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface RiskBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  riskLevel?: 'SAFE' | 'SUSPICIOUS' | 'SCAM' | 'low' | 'medium' | 'high';
  showIcon?: boolean;
}

const RiskBadge = React.forwardRef<HTMLSpanElement, RiskBadgeProps>(
  ({ className, variant, size, riskLevel, showIcon = true, children, ...props }, ref) => {
    const getVariant = () => {
      if (variant) return variant;
      switch (riskLevel) {
        case 'SAFE':
        case 'low':
          return 'success';
        case 'SUSPICIOUS':
        case 'medium':
          return 'warning';
        case 'SCAM':
        case 'high':
          return 'danger';
        default:
          return 'default';
      }
    };

    const getIcon = () => {
      if (!showIcon) return null;
      switch (riskLevel) {
        case 'SAFE':
        case 'low':
          return <ShieldCheck className="h-3.5 w-3.5" />;
        case 'SUSPICIOUS':
        case 'medium':
          return <ShieldAlert className="h-3.5 w-3.5" />;
        case 'SCAM':
        case 'high':
          return <ShieldX className="h-3.5 w-3.5" />;
        default:
          return null;
      }
    };

    const getLabel = () => {
      if (children) return children;
      switch (riskLevel) {
        case 'SAFE':
          return 'Safe';
        case 'SUSPICIOUS':
          return 'Suspicious';
        case 'SCAM':
          return 'Scam Detected';
        case 'low':
          return 'Low Risk';
        case 'medium':
          return 'Medium Risk';
        case 'high':
          return 'High Risk';
        default:
          return 'Unknown';
      }
    };

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant: getVariant(), size, className }))}
        {...props}
      >
        {getIcon()}
        {getLabel()}
      </span>
    );
  }
);
RiskBadge.displayName = "RiskBadge";

export { RiskBadge, badgeVariants };
