import { IKpiRepository } from '../../domain/ports/kpi-repository.interface';
import { FilterParams, TopProduct } from '../../domain/entities/kpi.entity';

export class GetTopProductsUseCase {
  constructor(private readonly kpiRepository: IKpiRepository) {}

  async execute(filters: FilterParams, metric: 'gmv' | 'revenue', limit: number = 10): Promise<TopProduct[]> {
    if (limit < 1 || limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }
    return this.kpiRepository.getTopProducts(filters, metric, limit);
  }
}
