'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TopProductsChart } from '@/components/charts/TopProductsChart';
import { GlobalFilters } from '@/components/filters/GlobalFilters';
import { useTopProducts } from '@/hooks/useKPI';
import { useFilters } from '@/hooks/useFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Trophy, TrendingUp, DollarSign, Medal } from 'lucide-react';

export default function RankingsPage() {
  const { filters, dateRange, updateDateRange, updateFilter, clearFilters } = useFilters();
  const [metric, setMetric] = useState<'gmv' | 'revenue'>('gmv');
  const [limit, setLimit] = useState(10);

  const { data: products, isLoading } = useTopProducts({
    ...filters,
    metric,
    limit,
  });

  const getMedalColor = (index: number) => {
    switch(index) {
      case 0: return 'text-yellow-500';
      case 1: return 'text-gray-400';
      case 2: return 'text-amber-600';
      default: return 'text-gray-300';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="page-header">
          <h1 className="page-title">Product Rankings</h1>
          <p className="page-description">
            Discover your top performing products and categories
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <GlobalFilters
              dateRange={dateRange}
              onDateRangeChange={updateDateRange}
              filters={{
                orderStatus: filters.orderStatus,
                productCategory: filters.productCategory,
                customerState: filters.customerState,
              }}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
            />
          </div>
          
          <div className="col-span-3 space-y-6">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Ranking Metric</h3>
                      <p className="text-sm text-muted-foreground">Select how to rank products</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={metric === 'gmv' ? 'default' : 'outline'}
                      onClick={() => setMetric('gmv')}
                      className="gap-2"
                    >
                      <TrendingUp className="h-4 w-4" />
                      GMV
                    </Button>
                    <Button
                      variant={metric === 'revenue' ? 'default' : 'outline'}
                      onClick={() => setMetric('revenue')}
                      className="gap-2"
                    >
                      <DollarSign className="h-4 w-4" />
                      Revenue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="chart-container">
              <TopProductsChart
                data={products || []}
                metric={metric}
                loading={isLoading}
              />
            </div>

            <Card className="glass-card overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-primary" />
                  Top {limit} Products by {metric === 'gmv' ? 'GMV' : 'Revenue'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Rank</th>
                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Product ID</th>
                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Category</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">GMV</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Revenue</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Orders</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {products?.map((product, index) => (
                        <tr 
                          key={product.productId} 
                          className="group hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "text-lg font-bold",
                                getMedalColor(index)
                              )}>
                                #{index + 1}
                              </span>
                              {index < 3 && (
                                <Trophy className={cn("h-4 w-4", getMedalColor(index))} />
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 font-mono text-sm">
                            {product.productId.substring(0, 12)}...
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {product.productCategory.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="text-right py-4 px-6 font-medium">
                            {formatCurrency(product.gmv)}
                          </td>
                          <td className="text-right py-4 px-6 font-medium">
                            {formatCurrency(product.revenue)}
                          </td>
                          <td className="text-right py-4 px-6">
                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                              {formatNumber(product.orders)} orders
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}