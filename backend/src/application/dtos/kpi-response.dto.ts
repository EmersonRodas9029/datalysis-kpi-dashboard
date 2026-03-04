export class KpiResponseDto {
  gmv: number;
  revenue: number;
  orders: number;
  aov: number;
  itemsPerOrder: number;
  cancelRate: number;
  onTimeDeliveryRate: number;

  constructor(data: any) {
    this.gmv = Number(data.gmv) || 0;
    this.revenue = Number(data.revenue) || 0;
    this.orders = Number(data.orders) || 0;
    this.aov = Number(data.aov) || 0;
    this.itemsPerOrder = Number(data.itemsPerOrder) || 0;
    this.cancelRate = Number(data.cancelRate) || 0;
    this.onTimeDeliveryRate = Number(data.onTimeDeliveryRate) || 0;
  }
}

export class RevenueTrendPointDto {
  date: string;
  revenue: number;
  orders: number;

  constructor(data: any) {
    this.date = data.date;
    this.revenue = Number(data.revenue) || 0;
    this.orders = Number(data.orders) || 0;
  }
}

export class TopProductDto {
  productId: string;
  productCategory: string;
  gmv: number;
  revenue: number;
  orders: number;

  constructor(data: any) {
    this.productId = data.productId;
    this.productCategory = data.productCategory || 'Unknown';
    this.gmv = Number(data.gmv) || 0;
    this.revenue = Number(data.revenue) || 0;
    this.orders = Number(data.orders) || 0;
  }
}
