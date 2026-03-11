import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
  ComposedChart,
} from 'recharts';
import { RevenueTrendPoint } from '@/types/kpi.types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { TrendingUp, Calendar } from 'lucide-react';

interface RevenueTrendChartProps {
  data: RevenueTrendPoint[];
  loading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl p-4">
        <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-bold" style={{ color: entry.color }}>
              {entry.name === 'revenue' ? formatCurrency(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gradient-to-r from-gray-100 to-gray-50 animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const formattedData = data.map(point => ({
    ...point,
    date: formatDate(point.date),
    revenue: Number(point.revenue),
  }));

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Revenue & Orders Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={formattedData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                name="Revenue"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#16a34a"
                strokeWidth={2}
                fill="url(#ordersGradient)"
                name="Orders"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const RevenueBarChart: React.FC<RevenueTrendChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Revenue by Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gradient-to-r from-gray-100 to-gray-50 animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const formattedData = data.map(point => ({
    ...point,
    date: formatDate(point.date),
    revenue: Number(point.revenue),
  }));

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Revenue by Period
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="revenue" 
                fill="url(#barGradient)" 
                name="Revenue"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
