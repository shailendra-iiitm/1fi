import mongoose from 'mongoose';

const emiPlanSchema = new mongoose.Schema({
  tenure: { type: Number, required: true },
  monthlyPayment: { type: Number, required: true },
  interestRate: { type: Number, required: true, default: 0 },
  cashback: { type: Number, default: 0 },
});

const variantSchema = new mongoose.Schema({
  storage: { type: String, required: true },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  emiPlans: [emiPlanSchema],
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  image: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    badge: { type: String },
    colors: [colorSchema],
    variants: [variantSchema],
  },
  { timestamps: true }
);

productSchema.index({ slug: 1 });

export default mongoose.model('Product', productSchema);