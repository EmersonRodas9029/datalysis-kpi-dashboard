// Mock de PrismaClient para tests de integración
export const mockPrismaClient = {
  $queryRawUnsafe: jest.fn().mockImplementation((query, ...params) => {
    // Devolver datos mock según la consulta
    if (query.includes('kpi_data')) {
      return Promise.resolve([{
        total_orders: 53775,
        total_gmv: 7386050.8,
        total_revenue: 8645088.35,
        aov: 160.76,
        items_per_order: 1.14,
        cancel_rate: 0.0046,
        on_time_delivery_rate: 0.909
      }]);
    }
    if (query.includes('DATE_TRUNC')) {
      return Promise.resolve([
        { date: '2018-01-01', revenue: 8453.6, orders: 73 },
        { date: '2018-01-02', revenue: 29410.52, orders: 203 }
      ]);
    }
    if (query.includes('ORDER BY')) {
      return Promise.resolve([
        {
          productId: 'prod1',
          productCategory: 'health_beauty',
          gmv: 51860,
          revenue: 54923.58,
          orders: 150
        },
        {
          productId: 'prod2',
          productCategory: 'computers_accessories',
          gmv: 41082.6,
          revenue: 48196.58,
          orders: 255
        }
      ]);
    }
    return Promise.resolve([]);
  }),
  $disconnect: jest.fn(),
};

// Mock del módulo prisma-client
jest.mock('../../src/infrastructure/database/prisma-client', () => ({
  __esModule: true,
  default: mockPrismaClient,
}));
