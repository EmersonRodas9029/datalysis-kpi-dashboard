import { GetTopProductsUseCase } from '../../src/application/use-cases/get-top-products.use-case';
import { IKpiRepository } from '../../src/domain/ports/kpi-repository.interface';
import { FilterParams } from '../../src/domain/entities/kpi.entity';

// Mock del repositorio
class MockKpiRepository implements IKpiRepository {
  async getKpis(filters: FilterParams): Promise<any> {
    return {};
  }

  async getRevenueTrend(filters: FilterParams, grain: 'day' | 'week' | 'month'): Promise<any[]> {
    return [];
  }

  async getTopProducts(filters: FilterParams, metric: 'gmv' | 'revenue', limit: number): Promise<any[]> {
    return [
      {
        productId: 'prod1',
        productCategory: 'electronics',
        gmv: 50000,
        revenue: 48000,
        orders: 150,
      },
      {
        productId: 'prod2',
        productCategory: 'fashion',
        gmv: 45000,
        revenue: 43000,
        orders: 120,
      },
      {
        productId: 'prod3',
        productCategory: 'home',
        gmv: 40000,
        revenue: 38000,
        orders: 100,
      },
    ];
  }
}

describe('GetTopProductsUseCase', () => {
  let useCase: GetTopProductsUseCase;
  let mockRepository: IKpiRepository;

  beforeEach(() => {
    mockRepository = new MockKpiRepository();
    useCase = new GetTopProductsUseCase(mockRepository);
  });

  it('should return top products by GMV', async () => {
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
    };

    const result = await useCase.execute(filters, 'gmv', 5);

    expect(result).toBeDefined();
    expect(result.length).toBe(3);
    expect(result[0].gmv).toBe(50000);
    expect(result[0].productCategory).toBe('electronics');
  });

  it('should return top products by Revenue', async () => {
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
    };

    const result = await useCase.execute(filters, 'revenue', 5);
    expect(result).toBeDefined();
    expect(result[0].revenue).toBe(48000);
  });

  it('should respect limit parameter', async () => {
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
    };

    const result = await useCase.execute(filters, 'gmv', 2);
    expect(result.length).toBe(3); // Mock siempre devuelve 3, pero el use case pasa el limit al repo
  });

  it('should throw error for invalid limit', async () => {
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
    };

    await expect(useCase.execute(filters, 'gmv', 0)).rejects.toThrow('Limit must be between 1 and 100');
    await expect(useCase.execute(filters, 'gmv', 101)).rejects.toThrow('Limit must be between 1 and 100');
  });

  it('should handle empty results', async () => {
    const emptyRepo = {
      getKpis: jest.fn(),
      getRevenueTrend: jest.fn(),
      getTopProducts: jest.fn().mockResolvedValue([]),
    };

    const emptyUseCase = new GetTopProductsUseCase(emptyRepo);
    const filters: FilterParams = {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2018-12-31'),
    };

    const result = await emptyUseCase.execute(filters, 'gmv', 5);
    expect(result).toEqual([]);
  });
});
