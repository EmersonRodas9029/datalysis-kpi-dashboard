import { GetRevenueTrendUseCase } from '../../src/application/use-cases/get-revenue-trend.use-case';
import { IKpiRepository } from '../../src/domain/ports/kpi-repository.interface';
import { FilterParams } from '../../src/domain/entities/kpi.entity';

// Mock del repositorio
class MockKpiRepository implements IKpiRepository {
  async getKpis(filters: FilterParams): Promise<any> {
    return {};
  }

  async getRevenueTrend(filters: FilterParams, grain: 'day' | 'week' | 'month'): Promise<any[]> {
    return [
      { date: '2018-01-01', revenue: 50000, orders: 300 },
      { date: '2018-01-02', revenue: 55000, orders: 320 },
      { date: '2018-01-03', revenue: 60000, orders: 350 },
    ];
  }

  async getTopProducts(filters: FilterParams, metric: 'gmv' | 'revenue', limit: number): Promise<any[]> {
    return [];
  }
}

describe('GetRevenueTrendUseCase', () => {
  let useCase: GetRevenueTrendUseCase;
  let mockRepository: IKpiRepository;

  beforeEach(() => {
    mockRepository = new MockKpiRepository();
    useCase = new GetRevenueTrendUseCase(mockRepository);
  });

  it('should return revenue trend for daily grain', async () => {
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-01-31'),
    };

    const result = await useCase.execute(filters, 'day');

    expect(result).toBeDefined();
    expect(result.length).toBe(3);
    expect(result[0]).toHaveProperty('date');
    expect(result[0]).toHaveProperty('revenue');
    expect(result[0]).toHaveProperty('orders');
    expect(result[0].revenue).toBe(50000);
  });

  it('should return revenue trend for weekly grain', async () => {
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-01-31'),
    };

    const result = await useCase.execute(filters, 'week');
    expect(result).toBeDefined();
  });

  it('should return revenue trend for monthly grain', async () => {
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
    };

    const result = await useCase.execute(filters, 'month');
    expect(result).toBeDefined();
  });

  it('should handle empty result from repository', async () => {
    const emptyRepo = {
      getKpis: jest.fn().mockResolvedValue({}),
      getRevenueTrend: jest.fn().mockResolvedValue([]),
      getTopProducts: jest.fn().mockResolvedValue([]),
    };

    const emptyUseCase = new GetRevenueTrendUseCase(emptyRepo);
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-01-31'),
    };

    const result = await emptyUseCase.execute(filters, 'day');
    expect(result).toEqual([]);
  });
});
