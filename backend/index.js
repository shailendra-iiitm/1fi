require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');
const app = express();
app.use(cors()); app.use(express.json());
app.use('/api/products', productRoutes);
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(5000));
