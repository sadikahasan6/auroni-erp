import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
    <header className="fixed bg-white inset-x-0 top-0 z-10 border-b border-black/5 dark:border-white/10">
      <nav className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
        <div className="flex items-center">
          <a href="/"><img src="./logo.png" alt="Company Logo" className="w-40" /></a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-6">
          <a className="text-sm text-gray-950 dark:text-white" href="/docs">Docs</a>
          <a className="text-sm text-gray-950 dark:text-white" href="/features">Features</a>
          <a className="text-sm text-gray-950 dark:text-white" href="/pricing">Pricing</a>
          <a className="text-sm text-gray-950 dark:text-white" href="/about">About</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Login/Register buttons for desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <a 
            href="/login" 
            className="text-sm text-amber-950 font-semibold"
          >
            Login
          </a>
          <a 
            href="/signup" 
            className="text-sm text-white bg-amber-950  font-semibold px-6 py-2 rounded-md"
          >
            Register
          </a>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg mt-2 px-4 py-6 rounded-md">
          <a className="block text-sm text-gray-950 dark:text-white mb-3" href="/docs">Docs</a>
          <a className="block text-sm text-gray-950 dark:text-white mb-3" href="/features">Features</a>
          <a className="block text-sm text-gray-950 dark:text-white mb-3" href="/pricing">Pricing</a>
          <a className="block text-sm text-gray-950 dark:text-white mb-3" href="/about">About</a>

          {/* Mobile Login/Register buttons */}
          <a 
            href="/login" 
            className="block w-full text-sm text-center text-amber-950 font-semibold py-2 mt-4"
          >
            Login
          </a>
          <a 
            href="/signup" 
            className="block w-full text-sm text-center text-white bg-amber-950  font-semibold py-2 mt-4 rounded-md"
          >
            Register
          </a>
        </div>
      )}
    </header>
    <div className="h-14"></div>
    </>
  );
}
