# 1Fi - E-Commerce Product Catalog

Full-stack e-commerce application with EMI payment plans.

🔗 **Live Demo:** [https://1fi-edu.vercel.app](https://1fi-edu.vercel.app)

🔗 **API Base URL:** [https://onefi-tbeh.onrender.com](https://onefi-tbeh.onrender.com)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4, React Router v7, Axios |
| **Backend** | Node.js, Express 5, Mongoose 9 (ES Modules) |
| **Database** | MongoDB Atlas |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## Local Setup & Run Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env

# Start server
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install

# Create .env file (optional for local)
echo "VITE_API_URL=http://localhost:5000" > .env

# Start dev server
npm run dev
```

Frontend runs on `http://localhost:5173`, Backend on `http://localhost:5000`

---

## API Endpoints

### Base URL
- **Local:** `http://localhost:5000`
- **Production:** `https://onefi-tbeh.onrender.com`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info and available endpoints |
| GET | `/api/products` | List all products (summary) |
| GET | `/api/products/:slug` | Get product details with EMI plans |
| GET | `/api/health` | Health check |

### Example Responses

#### GET `/api/products`
```json
[
  {
    "_id": "65abc123...",
    "name": "iPhone 15 Pro",
    "slug": "iphone-15-pro",
    "brand": "Apple",
    "category": "Smartphones",
    "badge": "Best Seller",
    "description": "Latest iPhone with A17 Pro chip",
    "colors": [
      { "name": "Natural Titanium", "hex": "#9A9A9A", "image": "https://..." }
    ],
    "variants": [
      { "storage": "128GB", "mrp": 134900, "price": 129900 }
    ]
  }
]
```

#### GET `/api/products/iphone-15-pro`
```json
{
  "_id": "65abc123...",
  "name": "iPhone 15 Pro",
  "slug": "iphone-15-pro",
  "brand": "Apple",
  "category": "Smartphones",
  "badge": "Best Seller",
  "description": "Latest iPhone with A17 Pro chip",
  "colors": [
    { "name": "Natural Titanium", "hex": "#9A9A9A", "image": "https://..." },
    { "name": "Blue Titanium", "hex": "#394E6A", "image": "https://..." }
  ],
  "variants": [
    {
      "storage": "128GB",
      "mrp": 134900,
      "price": 129900,
      "emiPlans": [
        { "tenure": 3, "monthlyPayment": 43300, "interestRate": 0, "cashback": 0 },
        { "tenure": 6, "monthlyPayment": 21650, "interestRate": 0, "cashback": 500 },
        { "tenure": 12, "monthlyPayment": 11200, "interestRate": 4, "cashback": 1000 }
      ]
    }
  ],
  "createdAt": "2026-02-20T10:00:00.000Z",
  "updatedAt": "2026-02-20T10:00:00.000Z"
}
```

#### GET `/api/health`
```json
{
  "status": "ok",
  "timestamp": "2026-02-22T10:30:00.000Z"
}
```

---

## Database Schema

### Product Schema
```javascript
{
  name: String,           // Required - Product name
  slug: String,           // Required, Unique - URL-friendly identifier
  brand: String,          // Required - Brand name
  category: String,       // Required - Product category
  description: String,    // Product description
  badge: String,          // Optional badge (e.g., "Best Seller")
  colors: [ColorSchema],  // Available color options
  variants: [VariantSchema], // Storage variants with pricing
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

### Color Schema
```javascript
{
  name: String,    // Required - Color name (e.g., "Natural Titanium")
  hex: String,     // Required - Hex color code (e.g., "#9A9A9A")
  image: String    // Product image URL for this color
}
```

### Variant Schema
```javascript
{
  storage: String,         // Required - Storage capacity (e.g., "128GB")
  mrp: Number,             // Required - Maximum retail price
  price: Number,           // Required - Selling price
  emiPlans: [EMIPlanSchema] // Available EMI options
}
```

### EMI Plan Schema
```javascript
{
  tenure: Number,        // Required - Duration in months (3, 6, 9, 12, etc.)
  monthlyPayment: Number, // Required - Monthly EMI amount
  interestRate: Number,  // Required - Interest rate percentage (default: 0)
  cashback: Number       // Cashback amount (default: 0)
}
```

---

## Seed Data

To populate the database with sample products, use MongoDB Compass or mongosh:

```javascript
db.products.insertOne({
  name: "iPhone 15 Pro",
  slug: "iphone-15-pro",
  brand: "Apple",
  category: "Smartphones",
  description: "Latest iPhone with A17 Pro chip and titanium design",
  badge: "Best Seller",
  colors: [
    { name: "Natural Titanium", hex: "#9A9A9A", image: "https://example.com/iphone-natural.jpg" },
    { name: "Blue Titanium", hex: "#394E6A", image: "https://example.com/iphone-blue.jpg" }
  ],
  variants: [
    {
      storage: "128GB",
      mrp: 134900,
      price: 129900,
      emiPlans: [
        { tenure: 3, monthlyPayment: 43300, interestRate: 0, cashback: 0 },
        { tenure: 6, monthlyPayment: 21650, interestRate: 0, cashback: 500 },
        { tenure: 12, monthlyPayment: 11200, interestRate: 4, cashback: 1000 }
      ]
    },
    {
      storage: "256GB",
      mrp: 144900,
      price: 139900,
      emiPlans: [
        { tenure: 3, monthlyPayment: 46633, interestRate: 0, cashback: 0 },
        { tenure: 6, monthlyPayment: 23316, interestRate: 0, cashback: 750 },
        { tenure: 12, monthlyPayment: 12100, interestRate: 4, cashback: 1500 }
      ]
    }
  ]
});
```

---

## Environment Variables

### Backend (`backend/.env`)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5000
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=https://onefi-tbeh.onrender.com
```

---

## Deployment

### Frontend (Vercel)
1. Import repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `VITE_API_URL`
4. Deploy

### Backend (Render)
1. Create new Web Service
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add environment variable: `MONGODB_URI`
6. Deploy

---

## Project Structure
```
├── backend/
│   ├── models/
│   │   └── Product.js      # Mongoose schema
│   ├── routes/
│   │   └── products.js     # API routes
│   ├── index.js            # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── config/         # API configuration
│   │   └── utils/          # Utility functions
│   ├── vercel.json         # Vercel config
│   └── package.json
└── Readme.md
```
