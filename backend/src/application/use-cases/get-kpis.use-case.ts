import { IKpiRepository } from '../../domain/ports/kpi-repository.interface';
import { FilterParams, KPI } from '../../domain/entities/kpi.entity';

export class GetKpisUseCase {
  constructor(private readonly kpiRepository: IKpiRepository) {}

  async execute(filters: FilterParams): Promise<KPI> {
    return this.kpiRepository.getKpis(filters);
  }
}