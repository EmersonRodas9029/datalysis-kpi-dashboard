export interface KPI {
  gmv: number;
  revenue: number;
  orders: number;
  aov: number;
  itemsPerOrder: number;
  cancelRate: number;
  onTimeDeliveryRate: number;
}

export interface RevenueTrendPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  productId: string;
  productCategory: string;
  gmv: number;
  revenue: number;
  orders: number;
}

export interface FilterParams {
  startDate: Date;
  endDate: Date;
  orderStatus?: string[];
  productCategory?: string[];
  customerState?: string[];
}