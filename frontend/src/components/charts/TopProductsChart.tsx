import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TopProduct } from '@/types/kpi.types';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface TopProductsChartProps {
  data: TopProduct[];
  metric: 'gmv' | 'revenue';
  loading?: boolean;
}

export const TopProductsChart: React.FC<TopProductsChartProps> = ({ data, metric, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Productos por {metric === 'gmv' ? 'GMV' : 'Revenue'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const formattedData = data.map(product => ({
    ...product,
    name: product.productCategory,
    value: metric === 'gmv' ? product.gmv : product.revenue,
    shortId: product.productId.substring(0, 8) + '...',
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Productos por {metric === 'gmv' ? 'GMV' : 'Revenue'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              layout="vertical"
              margin={{ left: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Categoría: ${label}`}
              />
              <Legend />
              <Bar dataKey="value" fill="#2563eb" name={metric === 'gmv' ? 'GMV' : 'Revenue'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
