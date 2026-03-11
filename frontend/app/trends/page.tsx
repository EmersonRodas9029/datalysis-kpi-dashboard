'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { RevenueTrendChart, RevenueBarChart } from '@/components/charts/RevenueTrendChart';
import { GlobalFilters } from '@/components/filters/GlobalFilters';
import { useRevenueTrend } from '@/hooks/useKPI';
import { useFilters } from '@/hooks/useFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function TrendsPage() {
  const { filters, dateRange, updateDateRange } = useFilters();
  const [grain, setGrain] = useState<'day' | 'week' | 'month'>('month');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const { data: trendData, isLoading } = useRevenueTrend({
    ...filters,
    grain,
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Tendencias</h1>
          <p className="text-muted-foreground mt-2">
            Análisis de tendencias de revenue y órdenes
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
            <Card>
              <CardHeader>
                <CardTitle>Configuración de visualización</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div>
                    <label className="text-sm font-medium">Agrupación</label>
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant={grain === 'day' ? 'default' : 'outline'}
                        onClick={() => setGrain('day')}
                      >
                        Día
                      </Button>
                      <Button
                        variant={grain === 'week' ? 'default' : 'outline'}
                        onClick={() => setGrain('week')}
                      >
                        Semana
                      </Button>
                      <Button
                        variant={grain === 'month' ? 'default' : 'outline'}
                        onClick={() => setGrain('month')}
                      >
                        Mes
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tipo de gráfico</label>
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant={chartType === 'line' ? 'default' : 'outline'}
                        onClick={() => setChartType('line')}
                      >
                        Línea
                      </Button>
                      <Button
                        variant={chartType === 'bar' ? 'default' : 'outline'}
                        onClick={() => setChartType('bar')}
                      >
                        Barras
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {chartType === 'line' ? (
              <RevenueTrendChart data={trendData || []} loading={isLoading} />
            ) : (
              <RevenueBarChart data={trendData || []} loading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
