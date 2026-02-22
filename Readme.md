# 1Fi - E-Commerce Product Catalog

Full-stack e-commerce application with EMI payment plans.

🔗 **Live Demo:** [https://1fi-edu.vercel.app](https://1fi-edu.vercel.app)

## Features
- Product catalog with multiple variants
- EMI payment plans calculator
- Responsive design with Tailwind CSS
- RESTful API with MongoDB

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS 4, React Router
- **Backend:** Node.js, Express 5, MongoDB, Mongoose (ES Modules)

## Local Setup

### Backend
```bash
cd backend
npm install
# Create .env file with MONGODB_URI
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Deployment
- **Frontend:** Vercel
- **Backend:** Render
