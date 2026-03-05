import { GetKpisUseCase } from '../../src/application/use-cases/get-kpis.use-case';
import { IKpiRepository } from '../../src/domain/ports/kpi-repository.interface';
import { FilterParams, KPI } from '../../src/domain/entities/kpi.entity';

// Mock del repositorio
class MockKpiRepository implements IKpiRepository {
  async getKpis(filters: FilterParams): Promise<KPI> {
    return {
      gmv: 1000000,
      revenue: 950000,
      orders: 5000,
      aov: 190,
      itemsPerOrder: 1.5,
      cancelRate: 0.02,
      onTimeDeliveryRate: 0.95,
    };
  }

  async getRevenueTrend(filters: FilterParams, grain: 'day' | 'week' | 'month'): Promise<any[]> {
    return [];
  }

  async getTopProducts(filters: FilterParams, metric: 'gmv' | 'revenue', limit: number): Promise<any[]> {
    return [];
  }
}

describe('GetKpisUseCase', () => {
  let useCase: GetKpisUseCase;
  let mockRepository: IKpiRepository;

  beforeEach(() => {
    mockRepository = new MockKpiRepository();
    useCase = new GetKpisUseCase(mockRepository);
  });

  it('should return KPIs for valid date range', async () => {
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
    };

    const result = await useCase.execute(filters);

    expect(result).toBeDefined();
    expect(result.gmv).toBe(1000000);
    expect(result.revenue).toBe(950000);
    expect(result.orders).toBe(5000);
    expect(result.aov).toBe(190);
    expect(result.itemsPerOrder).toBe(1.5);
    expect(result.cancelRate).toBe(0.02);
    expect(result.onTimeDeliveryRate).toBe(0.95);
  });

  it('should handle empty filters correctly', async () => {
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
      orderStatus: [],
      productCategory: [],
      customerState: [],
    };

    const result = await useCase.execute(filters);
    expect(result).toBeDefined();
  });

  it('should throw error if repository fails', async () => {
    const failingRepo = {
      getKpis: jest.fn().mockRejectedValue(new Error('Database error')),
      getRevenueTrend: jest.fn(),
      getTopProducts: jest.fn(),
    };

    const failingUseCase = new GetKpisUseCase(failingRepo);
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
    };

    await expect(failingUseCase.execute(filters)).rejects.toThrow('Database error');
  });
});
