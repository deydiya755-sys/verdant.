import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import plantRoutes from './routes/plantRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Root Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Verdant Botanical API Backend',
    version: '1.0.0'
  });
});

// Mount Routes
app.use('/api/plants', plantRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/newsletter', newsletterRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint '${req.method} ${req.originalUrl}' not found on Verdant API server`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Unhandled Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`🌿 Verdant API Backend Server running on http://localhost:${PORT}`);
});
