import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products — list all products (summary info)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(
      {},
      {
        name: 1,
        slug: 1,
        brand: 1,
        category: 1,
        badge: 1,
        description: 1,
        colors: 1,
        'variants.storage': 1,
        'variants.mrp': 1,
        'variants.price': 1,
      }
    );
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:slug — full product details with EMI plans
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;