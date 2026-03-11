import React from 'react';
import { KPICard } from './KPICard';
import { KPI } from '@/types/kpi.types';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Percent, 
  Truck,
  XCircle,
  BarChart3,
  Activity
} from 'lucide-react';

interface KPIGridProps {
  data: KPI;
  loading?: boolean;
}

export const KPIGrid: React.FC<KPIGridProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-32 bg-gradient-to-r from-gray-100 to-gray-50 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'GMV',
      value: formatCurrency(data.gmv),
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Gross Merchandise Value',
      trend: 12.5,
      color: 'blue' as const,
    },
    {
      title: 'Revenue',
      value: formatCurrency(data.revenue),
      icon: <DollarSign className="h-5 w-5" />,
      description: 'Total pagado',
      trend: 8.2,
      color: 'green' as const,
    },
    {
      title: 'Orders',
      value: formatNumber(data.orders),
      icon: <ShoppingCart className="h-5 w-5" />,
      description: 'Total órdenes',
      trend: 5.1,
      color: 'purple' as const,
    },
    {
      title: 'AOV',
      value: formatCurrency(data.aov),
      icon: <Package className="h-5 w-5" />,
      description: 'Valor promedio por orden',
      trend: -2.3,
      color: 'yellow' as const,
    },
    {
      title: 'Items/Order',
      value: formatNumber(data.itemsPerOrder),
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Items por orden',
      trend: 1.4,
      color: 'blue' as const,
    },
    {
      title: 'Cancel Rate',
      value: formatPercent(data.cancelRate),
      icon: <XCircle className="h-5 w-5" />,
      description: 'Tasa de cancelación',
      trend: -0.8,
      color: 'red' as const,
    },
    {
      title: 'On-Time Delivery',
      value: formatPercent(data.onTimeDeliveryRate),
      icon: <Truck className="h-5 w-5" />,
      description: 'Entregas a tiempo',
      trend: 3.2,
      color: 'green' as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <KPICard key={index} {...card} />
      ))}
    </div>
  );
};
