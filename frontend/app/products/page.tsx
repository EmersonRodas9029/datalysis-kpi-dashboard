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
import { TopProduct } from '@/types/kpi.types';

export default function ProductsPage() {
  const { filters, dateRange, updateDateRange } = useFilters();
  const [metric, setMetric] = useState<'gmv' | 'revenue'>('gmv');
  const [limit, setLimit] = useState(10);

  const { data: products, isLoading } = useTopProducts({
    ...filters,
    metric,
    limit,
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Análisis de Productos</h1>
          <p className="text-muted-foreground mt-2">
            Desempeño detallado de productos y categorías
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
                <CardTitle>Configuración</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div>
                    <label className="text-sm font-medium">Métrica</label>
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant={metric === 'gmv' ? 'default' : 'outline'}
                        onClick={() => setMetric('gmv')}
                      >
                        GMV
                      </Button>
                      <Button
                        variant={metric === 'revenue' ? 'default' : 'outline'}
                        onClick={() => setMetric('revenue')}
                      >
                        Revenue
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Límite</label>
                    <select
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      className="mt-1 px-3 py-2 border rounded-md"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <TopProductsChart
              data={products || []}
              metric={metric}
              loading={isLoading}
            />

            <Card>
              <CardHeader>
                <CardTitle>Tabla de Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Product ID</th>
                        <th className="text-left py-2">Categoría</th>
                        <th className="text-right py-2">GMV</th>
                        <th className="text-right py-2">Revenue</th>
                        <th className="text-right py-2">Órdenes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product: TopProduct) => (
                        <tr key={product.productId} className="border-b">
                          <td className="py-2 font-mono text-sm">
                            {product.productId.substring(0, 12)}...
                          </td>
                          <td className="py-2 capitalize">
                            {product.productCategory.replace('_', ' ')}
                          </td>
                          <td className="text-right py-2">{formatCurrency(product.gmv)}</td>
                          <td className="text-right py-2">{formatCurrency(product.revenue)}</td>
                          <td className="text-right py-2">{formatNumber(product.orders)}</td>
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