import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import EMIPlanCard from '../components/EMIPlanCard';
import { formatPrice, formatDiscount } from '../utils/formatPrice';
import API_BASE_URL from '../config/api';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/products/${slug}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedVariantIdx(0);
        setSelectedColorIdx(0);
        setSelectedPlanIdx(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.response?.status === 404
            ? 'Product not found'
            : 'Failed to load product'
        );
        setLoading(false);
      });
  }, [slug]);

  /* ── Loading / Error states ──────────────────────────── */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <Link
          to="/"
          className="text-emerald-600 underline font-medium hover:text-emerald-700"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  /* ── Derived values ──────────────────────────────────── */
  const variant = product.variants[selectedVariantIdx];
  const color = product.colors[selectedColorIdx];
  const selectedPlan =
    selectedPlanIdx !== null ? variant.emiPlans[selectedPlanIdx] : null;

  const handleProceed = () => {
    if (selectedPlan) setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* ═══ Left Column — Image ═══════════════════════ */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 self-start lg:sticky lg:top-24">
          {/* Badge + Title */}
          {product.badge && (
            <span className="inline-block px-3 py-1 text-[11px] font-bold text-red-500 bg-red-50 rounded uppercase tracking-wide mb-2">
              {product.badge}
            </span>
          )}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">{variant.storage}</p>

          {/* Product Image */}
          <div className="flex items-center justify-center py-10 lg:py-14 bg-gray-50 rounded-xl mt-4">
            <img
              key={selectedColorIdx}
              src={color?.image}
              alt={`${product.name} — ${color?.name}`}
              className="max-h-64 lg:max-h-80 w-auto object-contain animate-fade-in"
              onError={(e) => {
                e.target.src = `https://placehold.co/400x500/e5e7eb/9ca3af?text=${encodeURIComponent(product.name)}`;
              }}
            />
          </div>

          {/* Color picker */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">
              Available in {product.colors.length} finishes
            </p>
            <div className="flex items-center gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColorIdx(i)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                    i === selectedColorIdx
                      ? 'border-emerald-500 scale-110 shadow-md'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>
            {color && (
              <p className="text-xs text-gray-400 mt-2">{color.name}</p>
            )}
          </div>

          {/* Description (optional, shown on lg) */}
          {product.description && (
            <p className="hidden lg:block text-sm text-gray-500 mt-6 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* ═══ Right Column — Pricing & Plans ════════════ */}
        <div className="space-y-5">
          {/* Storage selector */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-3">Storage</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedVariantIdx(i);
                    setSelectedPlanIdx(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
                    i === selectedVariantIdx
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {v.storage}
                </button>
              ))}
            </div>
          </div>

          {/* Price card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(variant.price)}
              </span>
              {variant.mrp > variant.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(variant.mrp)}
                  </span>
                  <span className="text-sm font-semibold text-emerald-600">
                    {formatDiscount(variant.mrp, variant.price)}
                  </span>
                </>
              )}
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              EMI plans backed by mutual funds
            </p>
          </div>

          {/* EMI plans */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Choose an EMI Plan
            </h2>
            <div className="space-y-3">
              {variant.emiPlans.map((plan, i) => (
                <EMIPlanCard
                  key={`${selectedVariantIdx}-${i}`}
                  plan={plan}
                  isSelected={selectedPlanIdx === i}
                  onSelect={() => setSelectedPlanIdx(i)}
                />
              ))}
            </div>
          </div>

          {/* Proceed button */}
          <button
            onClick={handleProceed}
            disabled={selectedPlanIdx === null}
            className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
              selectedPlanIdx !== null
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 cursor-pointer active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedPlanIdx !== null
              ? 'Proceed with this plan'
              : 'Select an EMI plan to proceed'}
          </button>
        </div>
      </div>

      {/* ═══ Order Summary Modal ═════════════════════════ */}
      {showModal && selectedPlan && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-5">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <Row label="Product" value={product.name} />
              <Row label="Storage" value={variant.storage} />
              <Row label="Color" value={color?.name} />
              <Divider />
              <Row
                label="EMI Amount"
                value={`${formatPrice(selectedPlan.monthlyPayment)}/mo`}
                highlight
              />
              <Row label="Tenure" value={`${selectedPlan.tenure} months`} />
              <Row
                label="Interest Rate"
                value={`${selectedPlan.interestRate}%`}
              />
              {selectedPlan.cashback > 0 && (
                <Row
                  label="Cashback"
                  value={formatPrice(selectedPlan.cashback)}
                  highlight
                />
              )}
              <Divider />
              <div className="flex justify-between text-base">
                <span className="text-gray-500">Total Price</span>
                <span className="font-bold text-gray-900">
                  {formatPrice(variant.price)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Order placed successfully! 🎉');
                  setShowModal(false);
                }}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── tiny helper components ────────────────────────────── */
function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={highlight ? 'font-semibold text-emerald-600' : 'font-medium text-gray-900'}>
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <hr className="border-gray-100" />;
}
