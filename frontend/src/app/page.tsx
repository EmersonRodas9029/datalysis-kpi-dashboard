'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPIGrid } from '@/components/kpi-cards/KPIGrid';
import { RevenueTrendChart, RevenueBarChart } from '@/components/charts/RevenueTrendChart';
import { GlobalFilters } from '@/components/filters/GlobalFilters';
import { useKPIs, useRevenueTrend } from '@/hooks/useKPI';
import { useFilters } from '@/hooks/useFilters';
import { useHydration } from '@/hooks/useHydration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function Home() {
  const { isMounted } = useHydration();
  const { filters, dateRange, updateDateRange, updateFilter, clearFilters } = useFilters();
  
  const { data: kpis, isLoading: kpisLoading } = useKPIs(filters);
  const { data: trendData, isLoading: trendLoading } = useRevenueTrend({
    ...filters,
    grain: 'month',
  });

  const previousPeriodRevenue = trendData && trendData.length > 0 
    ? trendData[Math.floor(trendData.length / 2)].revenue 
    : 0;
  const currentPeriodRevenue = trendData && trendData.length > 0
    ? trendData[trendData.length - 1].revenue
    : 0;
  const revenueTrend = previousPeriodRevenue > 0 
    ? ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100 
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with stats */}
        <div className="page-header">
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-description">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-2">{formatCurrency(kpis?.revenue || 0)}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    {revenueTrend > 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={cn(
                      "text-sm",
                      revenueTrend > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {Math.abs(revenueTrend).toFixed(1)}%
                    </span>
                    <span className="text-xs text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Period</p>
                  {isMounted && (
                    <h3 className="text-lg font-bold mt-2">
                      {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                    </h3>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Last 30 days analysis
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Filters</p>
                  <h3 className="text-lg font-bold mt-2">
                    {Object.values(filters).filter(v => Array.isArray(v) && v.length > 0).length}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    filters applied
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <div className="h-6 w-6 text-green-500 font-bold">✓</div>
                </div>
              </div>
            </CardContent>
          </Card>
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
            {/* KPI Grid */}
            <div className="chart-container">
              <KPIGrid data={kpis || {
                gmv: 0,
                revenue: 0,
                orders: 0,
                aov: 0,
                itemsPerOrder: 0,
                cancelRate: 0,
                onTimeDeliveryRate: 0,
              }} loading={kpisLoading} />
            </div>

            {/* Charts */}
            <div className="chart-container">
              <Tabs defaultValue="line" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Revenue Analysis</h2>
                  <TabsList>
                    <TabsTrigger value="line">Line Chart</TabsTrigger>
                    <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="line">
                  <RevenueTrendChart 
                    data={trendData || []} 
                    loading={trendLoading} 
                  />
                </TabsContent>
                <TabsContent value="bar">
                  <RevenueBarChart 
                    data={trendData || []} 
                    loading={trendLoading} 
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
