import { Router } from 'express';
import { KpiController } from '../controllers/kpi.controller';
import { PrismaKpiRepository } from '../../infrastructure/repositories/prisma-kpi.repository';
import { GetKpisUseCase } from '../../application/use-cases/get-kpis.use-case';
import { GetRevenueTrendUseCase } from '../../application/use-cases/get-revenue-trend.use-case';
import { GetTopProductsUseCase } from '../../application/use-cases/get-top-products.use-case';
import { validateQuery } from '../middleware/validation.middleware';
import { kpiQuerySchema, trendQuerySchema, topProductsQuerySchema } from '../validators/kpi.validator';

const router = Router();

// Inicializar dependencias
const repository = new PrismaKpiRepository();
const getKpisUseCase = new GetKpisUseCase(repository);
const getRevenueTrendUseCase = new GetRevenueTrendUseCase(repository);
const getTopProductsUseCase = new GetTopProductsUseCase(repository);
const controller = new KpiController(getKpisUseCase, getRevenueTrendUseCase, getTopProductsUseCase);

// Rutas
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

router.get('/kpis', validateQuery(kpiQuerySchema), (req, res) => controller.getKpis(req, res));
router.get('/trend/revenue', validateQuery(trendQuerySchema), (req, res) => controller.getRevenueTrend(req, res));
router.get('/rankings/products', validateQuery(topProductsQuerySchema), (req, res) => controller.getTopProducts(req, res));

export default router;
