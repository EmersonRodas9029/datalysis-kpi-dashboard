import { PrismaClient } from '@prisma/client';
import { IKpiRepository } from '../../domain/ports/kpi-repository.interface';
import { FilterParams, KPI, RevenueTrendPoint, TopProduct } from '../../domain/entities/kpi.entity';
import prisma from '../database/prisma-client';

export class PrismaKpiRepository implements IKpiRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async getKpis(filters: FilterParams): Promise<KPI> {
    const { startDate, endDate, orderStatus, productCategory, customerState } = filters;

    let whereConditions = `
      WHERE o.order_purchase_timestamp BETWEEN $1::timestamp AND $2::timestamp
    `;
    const params: any[] = [startDate, endDate];
    let paramIndex = 3;

    if (orderStatus && orderStatus.length > 0) {
      whereConditions += ` AND o.order_status = ANY($${paramIndex}::varchar[])`;
      params.push(orderStatus);
      paramIndex++;
    }

    if (productCategory && productCategory.length > 0) {
      whereConditions += ` AND p.product_category_name_english = ANY($${paramIndex}::varchar[])`;
      params.push(productCategory);
      paramIndex++;
    }

    if (customerState && customerState.length > 0) {
      whereConditions += ` AND c.customer_state = ANY($${paramIndex}::varchar[])`;
      params.push(customerState);
      paramIndex++;
    }

    const query = `
      WITH kpi_data AS (
        SELECT 
          COUNT(DISTINCT f.order_id) as total_orders,
          COALESCE(SUM(f.item_price), 0) as total_gmv,
          COALESCE(SUM(f.payment_value_allocated), 0) as total_revenue,
          COUNT(*) as total_items,
          SUM(CASE WHEN f.is_canceled THEN 1 ELSE 0 END) as canceled_items,
          SUM(CASE WHEN f.is_delivered THEN 1 ELSE 0 END) as delivered_items,
          SUM(CASE WHEN f.is_on_time THEN 1 ELSE 0 END) as on_time_items
        FROM gold.fact_sales f
        JOIN gold.dim_order o ON f.order_sk = o.order_sk
        JOIN gold.dim_customer c ON f.customer_sk = c.customer_sk
        JOIN gold.dim_product p ON f.product_sk = p.product_sk
        ${whereConditions}
      )
      SELECT 
        total_orders,
        total_gmv,
        total_revenue,
        CASE WHEN total_orders > 0 THEN total_revenue / total_orders ELSE 0 END as aov,
        CASE WHEN total_orders > 0 THEN total_items::float / total_orders ELSE 0 END as items_per_order,
        CASE WHEN total_items > 0 THEN canceled_items::float / total_items ELSE 0 END as cancel_rate,
        CASE WHEN delivered_items > 0 THEN on_time_items::float / delivered_items ELSE 0 END as on_time_delivery_rate
      FROM kpi_data
    `;

    try {
      const result = await this.prisma.$queryRawUnsafe(query, ...params);
      const data = (result as any[])[0] || {};

      return {
        gmv: Number(data.total_gmv) || 0,
        revenue: Number(data.total_revenue) || 0,
        orders: Number(data.total_orders) || 0,
        aov: Number(data.aov) || 0,
        itemsPerOrder: Number(data.items_per_order) || 0,
        cancelRate: Number(data.cancel_rate) || 0,
        onTimeDeliveryRate: Number(data.on_time_delivery_rate) || 0,
      };
    } catch (error) {
      console.error('Error in getKpis:', error);
      throw error;
    }
  }

  async getRevenueTrend(filters: FilterParams, grain: 'day' | 'week' | 'month'): Promise<RevenueTrendPoint[]> {
    const { startDate, endDate } = filters;

    const query = `
      SELECT 
        TO_CHAR(DATE_TRUNC($1, o.order_purchase_timestamp), 'YYYY-MM-DD') as date,
        COALESCE(SUM(f.payment_value_allocated), 0) as revenue,
        COUNT(DISTINCT f.order_id) as orders
      FROM gold.fact_sales f
      JOIN gold.dim_order o ON f.order_sk = o.order_sk
      WHERE o.order_purchase_timestamp BETWEEN $2 AND $3
      GROUP BY DATE_TRUNC($1, o.order_purchase_timestamp)
      ORDER BY DATE_TRUNC($1, o.order_purchase_timestamp)
    `;

    try {
      const result = await this.prisma.$queryRawUnsafe(query, grain, startDate, endDate);
      return (result as any[]).map(row => ({
        date: row.date,
        revenue: Number(row.revenue) || 0,
        orders: Number(row.orders) || 0,
      }));
    } catch (error) {
      console.error('Error in getRevenueTrend:', error);
      return [];
    }
  }

  async getTopProducts(filters: FilterParams, metric: 'gmv' | 'revenue', limit: number): Promise<TopProduct[]> {
    const { startDate, endDate } = filters;

    const orderBy = metric === 'gmv' ? 'gmv' : 'revenue';

    // Usar la misma consulta que funciona en PostgreSQL
    const query = `
      SELECT 
        p.product_id as "productId",
        COALESCE(p.product_category_name_english, 'Unknown') as "productCategory",
        SUM(f.item_price) as gmv,
        SUM(f.payment_value_allocated) as revenue,
        COUNT(DISTINCT f.order_id) as orders
      FROM gold.fact_sales f
      JOIN gold.dim_product p ON f.product_sk = p.product_sk
      JOIN gold.dim_order o ON f.order_sk = o.order_sk
      WHERE o.order_purchase_timestamp BETWEEN $1 AND $2
      GROUP BY p.product_id, p.product_category_name_english
      ORDER BY ${orderBy} DESC
      LIMIT $3
    `;

    console.log('Executing top products query:', { 
      startDate: startDate.toISOString(), 
      endDate: endDate.toISOString(), 
      metric, 
      limit 
    });

    try {
      const result = await this.prisma.$queryRawUnsafe(query, startDate, endDate, limit);
      console.log('Query result rows:', result);
      
      if (!result || (result as any[]).length === 0) {
        console.log('No results found for top products');
        return [];
      }

      return (result as any[]).map(row => ({
        productId: String(row.productId),
        productCategory: String(row.productCategory),
        gmv: Number(row.gmv) || 0,
        revenue: Number(row.revenue) || 0,
        orders: Number(row.orders) || 0,
      }));
    } catch (error) {
      console.error('Error in getTopProducts:', error);
      return [];
    }
  }
}
