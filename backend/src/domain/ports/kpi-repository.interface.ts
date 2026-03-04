import { KPI, RevenueTrendPoint, TopProduct, FilterParams } from '../entities/kpi.entity';

export interface IKpiRepository {
  getKpis(filters: FilterParams): Promise<KPI>;
  getRevenueTrend(filters: FilterParams, grain: 'day' | 'week'): Promise<RevenueTrendPoint[]>;
  getTopProducts(filters: FilterParams, metric: 'gmv' | 'revenue', limit: number): Promise<TopProduct[]>;
}
