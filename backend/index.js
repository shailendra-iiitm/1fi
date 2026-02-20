import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ───────────────────────────────────────────── */
app.use(cors());
app.use(express.json());

/* ── Routes ──────────────────────────────────────────────── */
app.use('/api/products', productRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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