import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full py-16 md:py-24 px-5 md:px-[60px] bg-surface-container-low border-t border-outline-variant/20 mt-24">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand & Newsletter Column */}
        <div className="flex flex-col gap-6 md:w-1/3">
          <Link to="/" className="font-display-lg text-3xl text-secondary font-semibold tracking-tight">
            Verdant
          </Link>
          <p className="font-body-md text-on-surface-variant max-w-sm leading-relaxed">
            Cultivating beauty and tranquility in every modern space. Join our community of mindful growers and botanical lovers.
          </p>

          <form onSubmit={handleSubmit} className="mt-2 flex gap-2 w-full max-w-sm">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
            />
            <button
              type="submit"
              className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-md text-sm hover:bg-on-secondary-container transition-colors shadow-sm whitespace-nowrap active:scale-95"
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="text-secondary text-xs flex items-center gap-1 font-medium animate-fadeIn">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Welcome to the Verdant Sanctuary circle!
            </p>
          )}
        </div>

        {/* Links Navigation */}
        <nav className="flex flex-col sm:flex-row gap-12 md:gap-24 w-full md:w-auto">
          <div className="flex flex-col gap-4">
            <h4 className="font-title-lg text-lg text-on-surface font-medium">Explore</h4>
            <Link to="/shop" className="font-body-md text-sm text-on-surface-variant hover:text-secondary transition-colors">
              Botanical Collection
            </Link>
            <Link to="/quiz" className="font-body-md text-sm text-on-surface-variant hover:text-secondary transition-colors">
              Find Your Match Quiz
            </Link>
            <Link to="/care-dashboard" className="font-body-md text-sm text-on-surface-variant hover:text-secondary transition-colors">
              Plant Care Dashboard
            </Link>
            <a href="#shipping" className="font-body-md text-sm text-on-surface-variant hover:text-secondary transition-colors">
              Shipping & 30-Day Guarantee
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-title-lg text-lg text-on-surface font-medium">Connect</h4>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="font-body-md text-sm text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1">
              Instagram
            </a>
            <a href="#journal" className="font-body-md text-sm text-on-surface-variant hover:text-secondary transition-colors">
              The Verdant Journal
            </a>
            <a href="#sustainability" className="font-body-md text-sm text-on-surface-variant hover:text-secondary transition-colors">
              Organic Sustainability
            </a>
            <a href="#contact" className="font-body-md text-sm text-on-surface-variant hover:text-secondary transition-colors">
              Horticulturist Consultation
            </a>
          </div>
        </nav>
      </div>

      <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center text-xs text-on-surface-variant gap-4">
        <p>© 2024 Verdant Horticulture. Grown with intention, delivered with care.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
