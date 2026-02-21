/**
 * Format a number as Indian Rupee price with ₹ symbol.
 * e.g. 127400 → "₹1,27,400"
 */
export function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

/**
 * Calculate percentage discount between MRP and selling price.
 * e.g. mrp 134900, price 127400 → "6% off"
 */
export function formatDiscount(mrp, price) {
  const discount = Math.round(((mrp - price) / mrp) * 100);
  return `${discount}% off`;
}
