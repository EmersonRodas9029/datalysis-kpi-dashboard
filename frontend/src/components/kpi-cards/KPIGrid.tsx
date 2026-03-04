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
  XCircle 
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
          <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'GMV',
      value: formatCurrency(data.gmv),
      icon: <TrendingUp className="h-4 w-4" />,
      description: 'Gross Merchandise Value',
    },
    {
      title: 'Revenue',
      value: formatCurrency(data.revenue),
      icon: <DollarSign className="h-4 w-4" />,
      description: 'Total pagado',
    },
    {
      title: 'Orders',
      value: formatNumber(data.orders),
      icon: <ShoppingCart className="h-4 w-4" />,
      description: 'Total órdenes',
    },
    {
      title: 'AOV',
      value: formatCurrency(data.aov),
      icon: <Package className="h-4 w-4" />,
      description: 'Valor promedio por orden',
    },
    {
      title: 'Items/Order',
      value: formatNumber(data.itemsPerOrder),
      icon: <Package className="h-4 w-4" />,
      description: 'Items por orden',
    },
    {
      title: 'Cancel Rate',
      value: formatPercent(data.cancelRate),
      icon: <XCircle className="h-4 w-4" />,
      description: 'Tasa de cancelación',
    },
    {
      title: 'On-Time Delivery',
      value: formatPercent(data.onTimeDeliveryRate),
      icon: <Truck className="h-4 w-4" />,
      description: 'Entregas a tiempo',
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
