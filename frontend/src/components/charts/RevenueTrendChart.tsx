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
} from 'recharts';
import { RevenueTrendPoint } from '@/types/kpi.types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface RevenueTrendChartProps {
  data: RevenueTrendPoint[];
  loading?: boolean;
}

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
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
    <Card>
      <CardHeader>
        <CardTitle>Tendencia de Revenue y Órdenes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === 'revenue') return formatCurrency(value);
                  if (name === 'orders') return value;
                  return value;
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                name="Revenue"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#16a34a"
                name="Orders"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const RevenueBarChart: React.FC<RevenueTrendChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue por período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
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
    <Card>
      <CardHeader>
        <CardTitle>Revenue por período</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="revenue" fill="#2563eb" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
