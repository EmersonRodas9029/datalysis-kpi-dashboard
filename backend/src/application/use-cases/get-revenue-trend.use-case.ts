import { IKpiRepository } from '../../domain/ports/kpi-repository.interface';
import { FilterParams, RevenueTrendPoint } from '../../domain/entities/kpi.entity';

export class GetRevenueTrendUseCase {
  constructor(private readonly kpiRepository: IKpiRepository) {}

  async execute(filters: FilterParams, grain: 'day' | 'week'): Promise<RevenueTrendPoint[]> {
    return this.kpiRepository.getRevenueTrend(filters, grain);
  }
}
