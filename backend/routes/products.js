const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
router.get('/', async (req, res) => { const p = await Product.find(); res.json(p); });
router.get('/:slug', async (req, res) => { const p = await Product.findOne({slug: req.params.slug}); res.json(p); });
module.exports = router;
