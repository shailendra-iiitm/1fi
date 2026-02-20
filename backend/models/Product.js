const mongoose = require('mongoose');
const emiPlanSchema = new mongoose.Schema({ tenure: Number, monthlyPayment: Number, interestRate: Number, cashback: Number });
const variantSchema = new mongoose.Schema({ storage: String, mrp: Number, price: Number, emiPlans: [emiPlanSchema] });
const colorSchema = new mongoose.Schema({ name: String, hex: String, image: String });
const productSchema = new mongoose.Schema({ name: String, slug: { type: String, unique: true }, brand: String, category: String, description: String, badge: String, colors: [colorSchema], variants: [variantSchema] }, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);
