import { Request, Response } from 'express';
import { GetKpisUseCase } from '../../application/use-cases/get-kpis.use-case';
import { GetRevenueTrendUseCase } from '../../application/use-cases/get-revenue-trend.use-case';
import { GetTopProductsUseCase } from '../../application/use-cases/get-top-products.use-case';
import { FilterParams } from '../../domain/entities/kpi.entity';
import { KpiResponseDto, RevenueTrendPointDto, TopProductDto } from '../../application/dtos/kpi-response.dto';

export class KpiController {
  constructor(
    private readonly getKpisUseCase: GetKpisUseCase,
    private readonly getRevenueTrendUseCase: GetRevenueTrendUseCase,
    private readonly getTopProductsUseCase: GetTopProductsUseCase
  ) {}

  async getKpis(req: Request, res: Response): Promise<void> {
    try {
      const filters = this.buildFilters(req);
      const kpis = await this.getKpisUseCase.execute(filters);
      res.json(new KpiResponseDto(kpis));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getRevenueTrend(req: Request, res: Response): Promise<void> {
    try {
      const filters = this.buildFilters(req);
      const grain = req.query.grain === 'week' ? 'week' : 'day';
      const trend = await this.getRevenueTrendUseCase.execute(filters, grain);
      res.json(trend.map(point => new RevenueTrendPointDto(point)));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getTopProducts(req: Request, res: Response): Promise<void> {
    try {
      const filters = this.buildFilters(req);
      const metric = req.query.metric === 'revenue' ? 'revenue' : 'gmv';
      const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
      const products = await this.getTopProductsUseCase.execute(filters, metric, limit);
      res.json(products.map(product => new TopProductDto(product)));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private buildFilters(req: Request): FilterParams {
    const { from, to, orderStatus, productCategory, customerState } = req.query;

    if (!from || !to) {
      throw new Error('from and to parameters are required');
    }

    const startDate = new Date(from as string);
    const endDate = new Date(to as string);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format');
    }

    const filters: FilterParams = {
      startDate,
      endDate,
    };

    if (orderStatus) {
      filters.orderStatus = Array.isArray(orderStatus) 
        ? orderStatus as string[] 
        : [orderStatus as string];
    }

    if (productCategory) {
      filters.productCategory = Array.isArray(productCategory)
        ? productCategory as string[]
        : [productCategory as string];
    }

    if (customerState) {
      filters.customerState = Array.isArray(customerState)
        ? customerState as string[]
        : [customerState as string];
    }

    return filters;
  }

  private handleError(error: any, res: Response): void {
    console.error('Controller error:', error);
    
    if (error.message?.includes('required')) {
      res.status(400).json({ error: error.message });
    } else if (error.message?.includes('Date range')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
