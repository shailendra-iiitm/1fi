import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product }) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const matchedVariant = product.variants.find((v) => v.price === lowestPrice);
  const lowestMRP = matchedVariant?.mrp;
  const firstImage = product.colors?.[0]?.image;

  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Badge */}
        {product.badge && (
          <div className="px-4 pt-4">
            <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold text-red-500 bg-red-50 rounded uppercase tracking-wide">
              {product.badge}
            </span>
          </div>
        )}

        {/* Image */}
        <div className="p-6 flex items-center justify-center bg-gray-50/50 mx-4 mt-3 rounded-xl">
          <img
            src={firstImage}
            alt={product.name}
            className="h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://placehold.co/300x400/e5e7eb/9ca3af?text=${encodeURIComponent(product.name)}`;
            }}
          />
        </div>

        {/* Info */}
        <div className="p-4 pt-3 space-y-2">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">
            {product.brand}
          </p>
          <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(lowestPrice)}
            </span>
            {lowestMRP > lowestPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(lowestMRP)}
              </span>
            )}
          </div>

          {/* Color dots */}
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors?.map((color, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">
              {product.colors?.length} finishes
            </span>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium">
              View EMI Plans
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
