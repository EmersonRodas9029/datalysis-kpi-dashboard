import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateQuery = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation error',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      } else {
        next(error);
      }
    }
  };
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.message?.includes('required')) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};