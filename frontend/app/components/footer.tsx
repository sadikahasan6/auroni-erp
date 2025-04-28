import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Auroni ERP</h3>
            <p className="text-gray-400">
              Empowering businesses with seamless, customizable, and secure ERP systems to streamline operations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-indigo-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/features" className="hover:text-indigo-400 transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-indigo-400 transition-colors duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-indigo-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-indigo-400" />
                <a href="mailto:support@auroni-erp.com" className="hover:text-indigo-400 transition-colors duration-200">
                  support@auroni-erp.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-indigo-400" />
                <a href="tel:+8801983481488" className="hover:text-indigo-400 transition-colors duration-200">
                  +880 1983-481488
                </a>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-indigo-400" />
                <span>Ajugichala, Mawna, Sreepur, Gazipur-1740, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest ERP updates.</p>
            <div className="flex w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-indigo-400 min-w-0"
              />
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Auroni ERP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}