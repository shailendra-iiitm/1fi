import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

/* ── CORS Configuration ───────────────────────────────────── */
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://1fi-edu.vercel.app'
];

/* ── Middleware ───────────────────────────────────────────── */
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

/* ── Routes ──────────────────────────────────────────────── */
app.get('/', (_req, res) => {
  res.json({
    name: '1Fi E-Commerce API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      productDetail: '/api/products/:slug',
      health: '/api/health'
    }
  });
});

app.use('/api/products', productRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler for unknown routes
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/* ── Start ───────────────────────────────────────────────── */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  });