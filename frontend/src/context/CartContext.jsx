import React, { createContext, useContext, useState, useEffect } from 'react';
import { PLANTS, UPSELL_TOOLKIT } from '../data/plants';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Prepopulate with a stylish starting cart so checkout and dashboard look rich immediately
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('verdant_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        cartId: 'default-ficus',
        plantId: 'ficus-elastica-burgundy',
        name: 'Ficus Elastica',
        scientificName: 'Burgundy Rubber Tree',
        price: 45.00,
        potSize: 'Medium (6")',
        planter: 'Sand Ceramic',
        planterPrice: 28.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFNanNZZFzVG5YGjkcbr3DvxwOmgL_btDCHNGZKIBa7O4LI1mCv4-rKP7fw6cjJL1cdrtylAPDCUWFbtcj-jAbAraLjemfdxt2YL6sImLtr5OiiJPQ6FFymuqfZOByAmpNbn0DqOCkttIsrf5U6vlphPZ3qtd4_oLqXftjO_3ZsQTgFII_VjT3T5pZ5-18Hb4GlbbEqh1fU60b1tmxU6S82vn2s3pVNPeLgCYWTs_yrm4OfK8DpOnK'
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('verdant_last_order');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem('verdant_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    if (lastCompletedOrder) {
      try {
        localStorage.setItem('verdant_last_order', JSON.stringify(lastCompletedOrder));
      } catch (e) {}
    }
  }, [lastCompletedOrder]);

  const addToCart = (product, options = {}) => {
    const potSize = options.potSize || 'Medium (6")';
    const planter = options.planter || 'None';
    const planterPrice = options.planterPrice || 0;
    const priceDelta = options.priceDelta || 0;
    const finalUnitPrice = (product.price + priceDelta + planterPrice);

    const cartId = `${product.id}-${potSize}-${planter}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + (options.quantity || 1) }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartId,
            plantId: product.id,
            name: product.name,
            scientificName: product.scientificName || '',
            price: finalUnitPrice,
            basePrice: product.price,
            potSize,
            planter,
            quantity: options.quantity || 1,
            image: product.heroImage || product.image
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const addUpsellToolkit = () => {
    const cartId = 'upsell-toolkit';
    setCartItems(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) return prev;
      return [
        ...prev,
        {
          cartId,
          plantId: UPSELL_TOOLKIT.id,
          name: UPSELL_TOOLKIT.name,
          scientificName: 'Brass mister, pruning shears & organic nutrients',
          price: UPSELL_TOOLKIT.price,
          potSize: 'Complete Set',
          planter: 'N/A',
          quantity: 1,
          image: UPSELL_TOOLKIT.image
        }
      ];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shippingFee = subtotal >= 100 || subtotal === 0 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const grandTotal = Math.round((subtotal + shippingFee + tax) * 100) / 100;

  const recordOrder = (orderInfo) => {
    const orderData = {
      orderId: 'VRD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      arrivalDate: 'Wednesday, Oct 12',
      items: [...cartItems],
      subtotal,
      shippingFee,
      tax,
      grandTotal,
      customer: orderInfo
    };
    setLastCompletedOrder(orderData);
    clearCart();
    return orderData;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        addUpsellToolkit,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        shippingFee,
        tax,
        grandTotal,
        recordOrder,
        lastCompletedOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
