import { useState } from 'react';
import { Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = () => {
    if (email) {
      console.log('Newsletter signup:', email);
      setEmail('');
    }
  };

  return (
    <footer className="bg-white/55 dark:bg-black text-black dark:text-white border-t-2 border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-gray-300 dark:border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Join our email list</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Receive updates, access exclusive deals, learn product launch details, and more.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSubmit()}
                placeholder="Enter email"
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="px-3 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* LEGAL Section */}
          <div>
            <h4 className="font-bold mb-4">LEGAL</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Shipping</a></li>
            </ul>
          </div>

          {/* SHOP Section */}
          <div>
            <h4 className="font-bold mb-4">SHOP</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Sweetspants</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Hoodies</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">All Products</a></li>
            </ul>
          </div>

          {/* CUSTOMER CARE Section */}
          <div>
            <h4 className="font-bold mb-4">CUSTOMER CARE</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Search</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="font-bold mb-4">FOLLOW US</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025, Wants and Needs
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            {/* American Express */}
            <div className="flex items-center gap-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.724 15.769h-1.457l-.868-2.113-.434 2.113h-1.5l1.913-4.385 1.913 4.385zm-2.25-2.784l-.576-1.404-.576 1.404h1.152zm4.846-1.601h1.5v4.385h-1.5v-4.385zm2.25 0h1.5l-.9 2.25-.9-2.25h.9zm-9-2.25h3v1.5h-3v-1.5zm12.75-6H2.25C1.01 3 0 4.01 0 5.25v13.5C0 19.99 1.01 21 2.25 21h19.5c1.24 0 2.25-1.01 2.25-2.25V5.25c0-1.24-1.01-2.25-2.25-2.25zM3 6.75h18v10.5H3V6.75z"/>
              </svg>
              <span className="text-xs text-gray-600 dark:text-gray-400">AM EX</span>
            </div>
            
            {/* PayPal */}
            <div className="flex items-center gap-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="18" height="14" x="3" y="5" rx="2"/>
                <path d="M3 10h18"/>
              </svg>
              <span className="text-xs text-gray-600 dark:text-gray-400">Pay</span>
            </div>
            
            {/* Discover */}
            <div className="flex items-center gap-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9.5v3h10v-3H7z"/>
              </svg>
              <span className="text-xs text-gray-600 dark:text-gray-400">DISCOVER</span>
            </div>
            
            {/* Google Pay */}
            <div className="flex items-center gap-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                <path d="M12 18h.01"/>
              </svg>
              <span className="text-xs text-gray-600 dark:text-gray-400">G Pay</span>
            </div>
            
            {/* Visa */}
            <div className="flex items-center gap-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 6H6C4.9 6 4 6.9 4 8v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H6V8h12v8zM8 15.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm6 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"/>
              </svg>
              <span className="text-xs text-gray-600 dark:text-gray-400">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;