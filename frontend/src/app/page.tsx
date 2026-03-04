'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPIGrid } from '@/components/kpi-cards/KPIGrid';
import { RevenueTrendChart, RevenueBarChart } from '@/components/charts/RevenueTrendChart';
import { GlobalFilters } from '@/components/filters/GlobalFilters';
import { useKPIs, useRevenueTrend } from '@/hooks/useKPI';
import { useFilters } from '@/hooks/useFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function Home() {
  const { filters, dateRange, updateDateRange } = useFilters();
  
  const { data: kpis, isLoading: kpisLoading } = useKPIs(filters);
  const { data: trendData, isLoading: trendLoading } = useRevenueTrend({
    ...filters,
    grain: 'month',
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">
            Principales KPIs comerciales y tendencias
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <GlobalFilters
              dateRange={dateRange}
              onDateRangeChange={updateDateRange}
            />
          </div>
          
          <div className="col-span-3 space-y-6">
            <KPIGrid data={kpis || {
              gmv: 0,
              revenue: 0,
              orders: 0,
              aov: 0,
              itemsPerOrder: 0,
              cancelRate: 0,
              onTimeDeliveryRate: 0,
            }} loading={kpisLoading} />

            <Tabs defaultValue="line">
              <TabsList>
                <TabsTrigger value="line">Línea</TabsTrigger>
                <TabsTrigger value="bar">Barras</TabsTrigger>
              </TabsList>
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
    </DashboardLayout>
  );
}
