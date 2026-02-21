import { formatPrice } from '../utils/formatPrice';

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-emerald-500 bg-emerald-50/60 shadow-sm ring-1 ring-emerald-200'
          : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Radio indicator */}
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              isSelected ? 'border-emerald-500' : 'border-gray-300'
            }`}
          >
            {isSelected && (
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              {formatPrice(plan.monthlyPayment)}{' '}
              <span className="text-gray-500 font-normal">
                x {plan.tenure} months
              </span>
            </p>
            {plan.cashback > 0 && (
              <p className="text-sm text-emerald-600 mt-0.5">
                Additional cashback of {formatPrice(plan.cashback)}
              </p>
            )}
          </div>
        </div>

        <span
          className={`text-sm font-medium px-2.5 py-1 rounded-lg whitespace-nowrap ${
            plan.interestRate === 0
              ? 'text-emerald-700 bg-emerald-100'
              : 'text-gray-600 bg-gray-100'
          }`}
        >
          {plan.interestRate}% interest
        </span>
      </div>
    </div>
  );
}
