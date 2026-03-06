import { z } from 'zod';

export const dateRangeSchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
});

export const kpiQuerySchema = dateRangeSchema.extend({
  orderStatus: z.union([z.string(), z.array(z.string())]).optional(),
  productCategory: z.union([z.string(), z.array(z.string())]).optional(),
  customerState: z.union([z.string(), z.array(z.string())]).optional(),
});

export const trendQuerySchema = dateRangeSchema.extend({
  grain: z.enum(['day', 'week', 'month']).optional().default('day'),
  orderStatus: z.union([z.string(), z.array(z.string())]).optional(),
  productCategory: z.union([z.string(), z.array(z.string())]).optional(),
  customerState: z.union([z.string(), z.array(z.string())]).optional(),
});

export const topProductsQuerySchema = dateRangeSchema.extend({
  metric: z.enum(['gmv', 'revenue']).optional().default('gmv'),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  orderStatus: z.union([z.string(), z.array(z.string())]).optional(),
  productCategory: z.union([z.string(), z.array(z.string())]).optional(),
  customerState: z.union([z.string(), z.array(z.string())]).optional(),
});