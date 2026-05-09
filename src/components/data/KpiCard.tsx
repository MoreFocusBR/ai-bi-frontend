import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '../../lib/utils';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export function KpiCard({ title, value, unit, change, trend, icon }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
        </div>
        {change !== undefined && (
          <p className={cn(
            "text-xs flex items-center mt-1",
            trend === 'up' ? "text-emerald-500" : trend === 'down' ? "text-red-500" : "text-muted-foreground"
          )}>
            {trend === 'up' && <ArrowUp className="h-3 w-3 mr-1" />}
            {trend === 'down' && <ArrowDown className="h-3 w-3 mr-1" />}
            {trend === 'neutral' && <Minus className="h-3 w-3 mr-1" />}
            <span>{Math.abs(change)}% em relação ao período anterior</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
