export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">1Fi</span>
            <span className="text-sm">| Smart EMI Plans</span>
          </div>
          <p className="text-sm text-center sm:text-right">
            © {new Date().getFullYear()} 1Fi. All rights reserved. EMI plans
            backed by mutual funds.
          </p>
        </div>
      </div>
    </footer>
  );
}
