export function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">
              Stack PC<span className="text-blue-400"> AI</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Build the perfect PC with the power of artificial intelligence. 
              Get personalized recommendations based on your budget, use case, and preferences.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#build" className="hover:text-blue-400 transition-colors">AI PC Builder</a></li>
              <li><a href="#build" className="hover:text-blue-400 transition-colors">Compare PC Builds</a></li>
              <li><a href="#price-tracker" className="hover:text-blue-400 transition-colors">Price Tracker</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}