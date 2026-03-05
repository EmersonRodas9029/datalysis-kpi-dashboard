// IMPORTANTE: Los mocks deben estar antes de cualquier importación
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    $queryRawUnsafe: jest.fn().mockImplementation((query, ...params) => {
      console.log('Mock query:', query);
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

  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// Ahora importamos los módulos
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import routes from '../../src/adapters/http/routes';
import { errorHandler } from '../../src/adapters/middleware/validation.middleware';

// Crear app para testing
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

describe('KPI API Integration Tests', () => {
  describe('GET /api/health', () => {
    it('should return 200 OK with timestamp', async () => {
      const response = await request(app).get('/api/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/kpis', () => {
    it('should return 400 if from date is missing', async () => {
      const response = await request(app)
        .get('/api/kpis')
        .query({ to: '2018-12-31' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if to date is missing', async () => {
      const response = await request(app)
        .get('/api/kpis')
        .query({ from: '2018-01-01' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid date format', async () => {
      const response = await request(app)
        .get('/api/kpis')
        .query({ from: '2018/01/01', to: '2018/12/31' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 200 with KPIs for valid date range', async () => {
      const response = await request(app)
        .get('/api/kpis')
        .query({ from: '2018-01-01', to: '2018-12-31' });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('gmv');
      expect(response.body).toHaveProperty('revenue');
      expect(response.body).toHaveProperty('orders');
      expect(response.body).toHaveProperty('aov');
      expect(response.body).toHaveProperty('itemsPerOrder');
      expect(response.body).toHaveProperty('cancelRate');
      expect(response.body).toHaveProperty('onTimeDeliveryRate');
    });
  });

  describe('GET /api/trend/revenue', () => {
    it('should return 200 with daily trend', async () => {
      const response = await request(app)
        .get('/api/trend/revenue')
        .query({ from: '2018-01-01', to: '2018-01-31', grain: 'day' });
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 200 with weekly trend', async () => {
      const response = await request(app)
        .get('/api/trend/revenue')
        .query({ from: '2018-01-01', to: '2018-12-31', grain: 'week' });
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 200 with monthly trend', async () => {
      const response = await request(app)
        .get('/api/trend/revenue')
        .query({ from: '2018-01-01', to: '2018-12-31', grain: 'month' });
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 400 for invalid grain', async () => {
      const response = await request(app)
        .get('/api/trend/revenue')
        .query({ from: '2018-01-01', to: '2018-12-31', grain: 'year' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/rankings/products', () => {
    it('should return 200 with top products by GMV', async () => {
      const response = await request(app)
        .get('/api/rankings/products')
        .query({ from: '2018-01-01', to: '2018-12-31', metric: 'gmv', limit: 5 });
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('productId');
        expect(response.body[0]).toHaveProperty('productCategory');
        expect(response.body[0]).toHaveProperty('gmv');
        expect(response.body[0]).toHaveProperty('revenue');
        expect(response.body[0]).toHaveProperty('orders');
      }
    });

    it('should return 200 with top products by Revenue', async () => {
      const response = await request(app)
        .get('/api/rankings/products')
        .query({ from: '2018-01-01', to: '2018-12-31', metric: 'revenue', limit: 5 });
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should respect limit parameter', async () => {
      const response = await request(app)
        .get('/api/rankings/products')
        .query({ from: '2018-01-01', to: '2018-12-31', metric: 'gmv', limit: 3 });
      
      expect(response.status).toBe(200);
      expect(response.body.length).toBeLessThanOrEqual(3);
    });

    it('should return 400 for invalid limit', async () => {
      const response = await request(app)
        .get('/api/rankings/products')
        .query({ from: '2018-01-01', to: '2018-12-31', metric: 'gmv', limit: 200 });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid metric', async () => {
      const response = await request(app)
        .get('/api/rankings/products')
        .query({ from: '2018-01-01', to: '2018-12-31', metric: 'profit', limit: 5 });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
