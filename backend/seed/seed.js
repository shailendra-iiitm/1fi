require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product'); // adjust path if needed

// -------------------- EMI Helper Functions --------------------

function calculateEMI(principal, annualRate, tenureMonths) {
  if (annualRate === 0) {
    return Math.round(principal / tenureMonths);
  }

  const monthlyRate = annualRate / 12 / 100;

  return Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
}

function generateEMIPlans(mrp, cashback) {
  const tenures = [
    { months: 3, rate: 0 },
    { months: 6, rate: 0 },
    { months: 12, rate: 0 },
    { months: 24, rate: 0 },
    { months: 36, rate: 10.5 },
    { months: 48, rate: 10.5 },
    { months: 60, rate: 10.5 },
  ];

  return tenures.map((t) => ({
    tenure: t.months,
    monthlyPayment: calculateEMI(mrp, t.rate, t.months),
    interestRate: t.rate,
    cashback,
  }));
}

// -------------------- Seed Data --------------------
const products = [
  {
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    category: 'Smartphones',
    description:
      'The most advanced iPhone ever with A19 Pro chip, 48MP Fusion camera system, and aerospace-grade titanium design.',
    badge: 'NEW',
    colors: [
      {
        name: 'Natural Titanium',
        hex: '#C0B8A8',
        image:
          'https://placehold.co/400x500/C0B8A8/333333?text=iPhone+17+Pro&font=roboto',
      },
      {
        name: 'Desert Titanium',
        hex: '#E8A866',
        image:
          'https://placehold.co/400x500/E8A866/333333?text=iPhone+17+Pro&font=roboto',
      },
      {
        name: 'Blue Titanium',
        hex: '#3D3E5C',
        image:
          'https://placehold.co/400x500/3D3E5C/ffffff?text=iPhone+17+Pro&font=roboto',
      },
    ],
    variants: [
      {
        storage: '256GB',
        mrp: 134900,
        price: 127400,
        emiPlans: generateEMIPlans(134900, 7500),
      },
      {
        storage: '512GB',
        mrp: 154900,
        price: 147400,
        emiPlans: generateEMIPlans(154900, 7500),
      },
      {
        storage: '1TB',
        mrp: 174900,
        price: 167400,
        emiPlans: generateEMIPlans(174900, 8000),
      },
    ],
  },
  {
    name: 'Samsung Galaxy S25 Ultra',
    slug: 'samsung-galaxy-s25-ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    description:
      'Galaxy AI is here. Flagship smartphone with S Pen, 200MP camera, Snapdragon 8 Elite chipset, and titanium frame.',
    badge: 'BESTSELLER',
    colors: [
      {
        name: 'Titanium Black',
        hex: '#2C2C2C',
        image:
          'https://placehold.co/400x500/2C2C2C/ffffff?text=Galaxy+S25+Ultra&font=roboto',
      },
      {
        name: 'Titanium Gray',
        hex: '#8E8E8E',
        image:
          'https://placehold.co/400x500/8E8E8E/ffffff?text=Galaxy+S25+Ultra&font=roboto',
      },
      {
        name: 'Titanium Violet',
        hex: '#6B5B7B',
        image:
          'https://placehold.co/400x500/6B5B7B/ffffff?text=Galaxy+S25+Ultra&font=roboto',
      },
      {
        name: 'Titanium Blue',
        hex: '#4A6FA5',
        image:
          'https://placehold.co/400x500/4A6FA5/ffffff?text=Galaxy+S25+Ultra&font=roboto',
      },
    ],
    variants: [
      {
        storage: '256GB',
        mrp: 134999,
        price: 124999,
        emiPlans: generateEMIPlans(134999, 5000),
      },
      {
        storage: '512GB',
        mrp: 154999,
        price: 144999,
        emiPlans: generateEMIPlans(154999, 5000),
      },
      {
        storage: '1TB',
        mrp: 174999,
        price: 164999,
        emiPlans: generateEMIPlans(174999, 6000),
      },
    ],
  },
  {
    name: 'OnePlus 13',
    slug: 'oneplus-13',
    brand: 'OnePlus',
    category: 'Smartphones',
    description:
      'Flagship killer with Snapdragon 8 Elite, 6000 mAh silicon-carbon battery, and Hasselblad camera partnership.',
    badge: 'POPULAR',
    colors: [
      {
        name: 'Black Eclipse',
        hex: '#1A1A2E',
        image:
          'https://placehold.co/400x500/1A1A2E/ffffff?text=OnePlus+13&font=roboto',
      },
      {
        name: 'Arctic Dawn',
        hex: '#E8E8E8',
        image:
          'https://placehold.co/400x500/E8E8E8/333333?text=OnePlus+13&font=roboto',
      },
      {
        name: 'Midnight Ocean',
        hex: '#1A3A5C',
        image:
          'https://placehold.co/400x500/1A3A5C/ffffff?text=OnePlus+13&font=roboto',
      },
    ],
    variants: [
      {
        storage: '256GB',
        mrp: 69999,
        price: 64999,
        emiPlans: generateEMIPlans(69999, 3000),
      },
      {
        storage: '512GB',
        mrp: 79999,
        price: 74999,
        emiPlans: generateEMIPlans(79999, 3500),
      },
    ],
  },
  {
    name: 'Google Pixel 9 Pro',
    slug: 'google-pixel-9-pro',
    brand: 'Google',
    category: 'Smartphones',
    description:
      'The best of Google AI. Pro cameras with Magic Eraser, Tensor G4 chip, and 7 years of guaranteed OS updates.',
    badge: 'NEW',
    colors: [
      {
        name: 'Obsidian',
        hex: '#1A1A1A',
        image:
          'https://placehold.co/400x500/1A1A1A/ffffff?text=Pixel+9+Pro&font=roboto',
      },
      {
        name: 'Porcelain',
        hex: '#F5F0E8',
        image:
          'https://placehold.co/400x500/F5F0E8/333333?text=Pixel+9+Pro&font=roboto',
      },
      {
        name: 'Hazel',
        hex: '#8B7355',
        image:
          'https://placehold.co/400x500/8B7355/ffffff?text=Pixel+9+Pro&font=roboto',
      },
      {
        name: 'Rose Quartz',
        hex: '#D4A5A5',
        image:
          'https://placehold.co/400x500/D4A5A5/333333?text=Pixel+9+Pro&font=roboto',
      },
    ],
    variants: [
      {
        storage: '128GB',
        mrp: 109999,
        price: 99999,
        emiPlans: generateEMIPlans(109999, 4000),
      },
      {
        storage: '256GB',
        mrp: 119999,
        price: 109999,
        emiPlans: generateEMIPlans(119999, 4000),
      },
      {
        storage: '512GB',
        mrp: 134999,
        price: 124999,
        emiPlans: generateEMIPlans(134999, 5000),
      },
    ],
  },
];

// -------------------- Seed Function --------------------

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Existing products removed');

    const insertedProducts = await Product.insertMany(products);

    console.log(`Inserted ${insertedProducts.length} products into the database.`);

    insertedProducts.forEach((product) => {
      console.log(
        `${product.name} | Variants: ${product.variants.length} | Colors: ${product.colors.length}`
      );
    });

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error while seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();