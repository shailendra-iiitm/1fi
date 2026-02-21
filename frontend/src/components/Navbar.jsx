import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">1Fi</span>
            <span className="text-sm text-gray-400 hidden sm:inline">
              | Smart EMI Plans
            </span>
          </Link>

          <Link
            to="/"
            className="text-gray-600 hover:text-emerald-600 font-medium transition-colors text-sm"
          >
            All Products
          </Link>
        </div>
      </div>
    </nav>
  );
}
