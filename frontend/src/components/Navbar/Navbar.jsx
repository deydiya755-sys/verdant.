import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { PLANTS } from '../../data/plants';

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.trim() === ''
    ? []
    : PLANTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.lightLevel.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center h-20 px-5 md:px-[60px] max-w-[1280px] left-1/2 -translate-x-1/2 backdrop-blur-xl bg-surface/85 shadow-sm shadow-primary/5 transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="font-display-lg text-[28px] md:text-[34px] font-semibold text-primary tracking-tight transition-transform hover:scale-105"
          >
            Verdant
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 ml-4">
            <Link
              to="/shop"
              className={`font-body-md text-[15px] font-medium transition-all duration-200 ${
                isActive('/shop')
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary hover:border-b-2 hover:border-primary/40 pb-1'
              }`}
            >
              Shop All
            </Link>
            <Link
              to="/product/monstera-deliciosa"
              className={`font-body-md text-[15px] font-medium transition-all duration-200 ${
                isActive('/product')
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary hover:border-b-2 hover:border-primary/40 pb-1'
              }`}
            >
              Featured Specimen
            </Link>
            <Link
              to="/quiz"
              className={`font-body-md text-[15px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/quiz')
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary hover:border-b-2 hover:border-primary/40 pb-1'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">psychology_alt</span>
              Plant Finder Quiz
            </Link>
            <Link
              to="/care-dashboard"
              className={`font-body-md text-[15px] font-medium transition-all duration-200 ${
                isActive('/care-dashboard')
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary hover:border-b-2 hover:border-primary/40 pb-1'
              }`}
            >
              Care Dashboard
            </Link>
          </nav>
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search Collection"
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary active:scale-90"
          >
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            className="relative p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary active:scale-90"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          <Link
            to="/checkout"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant text-[13px] font-medium text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            Checkout
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="md:hidden p-2 rounded-full hover:bg-surface-container-low text-primary"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col gap-6 animate-fadeIn">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-surface-container text-on-surface hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-surface-container text-on-surface hover:text-primary"
            >
              Shop All Plants
            </Link>
            <Link
              to="/product/monstera-deliciosa"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-surface-container text-on-surface hover:text-primary"
            >
              Monstera Deliciosa (Featured)
            </Link>
            <Link
              to="/quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-surface-container text-on-surface hover:text-primary"
            >
              Plant Finder Quiz
            </Link>
            <Link
              to="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-surface-container text-on-surface hover:text-primary"
            >
              Secure Checkout
            </Link>
            <Link
              to="/care-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-surface-container text-on-surface hover:text-primary"
            >
              Care Dashboard & Orders
            </Link>
          </nav>
        </div>
      )}

      {/* Quick Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl w-full max-w-xl p-6 shadow-2xl border border-outline-variant/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
              <span className="material-symbols-outlined text-primary text-2xl">search</span>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by plant name, light level, or care type..."
                className="w-full bg-transparent font-body-md text-lg text-on-surface outline-none placeholder:text-on-surface-variant/50"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {searchQuery.trim() !== '' && (
              <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
                {searchResults.length === 0 ? (
                  <p className="text-on-surface-variant text-sm py-4 text-center">
                    No botanical matches found for "{searchQuery}".
                  </p>
                ) : (
                  searchResults.map(plant => (
                    <div
                      key={plant.id}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/product/${plant.id}`);
                      }}
                      className="flex items-center gap-4 p-2 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors"
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-title-lg font-medium text-on-surface">{plant.name}</h4>
                        <p className="text-xs text-on-surface-variant italic">{plant.scientificName}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-title-lg font-medium text-primary">${plant.price.toFixed(2)}</span>
                        <span className="block text-[11px] text-secondary">{plant.lightLevel}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
