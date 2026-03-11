import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  className?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const colorVariants = {
  blue: 'from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-200/50',
  green: 'from-green-500/10 to-green-500/5 text-green-600 border-green-200/50',
  red: 'from-red-500/10 to-red-500/5 text-red-600 border-red-200/50',
  yellow: 'from-yellow-500/10 to-yellow-500/5 text-yellow-600 border-yellow-200/50',
  purple: 'from-purple-500/10 to-purple-500/5 text-purple-600 border-purple-200/50',
};

const iconVariants = {
  blue: 'bg-blue-500/10 text-blue-600',
  green: 'bg-green-500/10 text-green-600',
  red: 'bg-red-500/10 text-red-600',
  yellow: 'bg-yellow-500/10 text-yellow-600',
  purple: 'bg-purple-500/10 text-purple-600',
};

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  color = 'blue',
}) => {
  return (
    <div className={cn(
      "stat-card group",
      className
    )}>
      {/* Gradient background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        colorVariants[color]
      )} />
      
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground group-hover:text-current transition-colors">
              {title}
            </p>
            <h3 className="text-2xl font-bold mt-2 group-hover:scale-105 transition-transform">
              {value}
            </h3>
          </div>
          <div className={cn(
            "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
            iconVariants[color]
          )}>
            {icon}
          </div>
        </div>

        {(description || trend !== undefined) && (
          <div className="flex items-center gap-2 mt-4">
            {trend !== undefined && (
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                trend > 0 ? "bg-green-500/10 text-green-600" : 
                trend < 0 ? "bg-red-500/10 text-red-600" : 
                "bg-gray-500/10 text-gray-600"
              )}>
                {trend > 0 ? <ArrowUpRight className="h-3 w-3" /> : 
                 trend < 0 ? <ArrowDownRight className="h-3 w-3" /> : null}
                <span>{Math.abs(trend || 0)}%</span>
              </div>
            )}
            {description && (
              <span className="text-xs text-muted-foreground group-hover:text-current/70">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
