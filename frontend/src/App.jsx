import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';

import HomePage from './pages/Home/HomePage';
import ShopPage from './pages/Shop/ShopPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import PlantQuizPage from './pages/PlantQuiz/PlantQuizPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import CareDashboardPage from './pages/CareDashboard/CareDashboardPage';

// Helper to ensure window scrolls to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper conditionally showing Navbar and Footer
function Layout() {
  const location = useLocation();
  const isQuiz = location.pathname === '/quiz';

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <ScrollToTop />
      {!isQuiz && <Navbar />}
      <CartDrawer />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product" element={<ProductDetailPage />} />
          <Route path="/quiz" element={<PlantQuizPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/care-dashboard" element={<CareDashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      {!isQuiz && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}
