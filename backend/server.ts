import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/kpis', (req, res) => {
  res.json({ message: 'KPI endpoint working' });
});

app.listen(port, () => {
  console.log(`🚀 Backend running on port ${port}`);
});
