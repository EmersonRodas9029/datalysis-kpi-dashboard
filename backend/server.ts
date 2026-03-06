import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './src/adapters/http/routes';
import { errorHandler } from './src/adapters/middleware/validation.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('combined'));

app.use('/api', routes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(` Backend running on port ${port}`);
  console.log(` API available at http://localhost:${port}/api`);
  console.log(`Health check: http://localhost:${port}/api/health`);
});