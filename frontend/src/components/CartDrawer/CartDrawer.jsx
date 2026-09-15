import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-title-lg text-2xl text-on-surface font-semibold">Your Cart</h2>
              <span className="text-xs bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant font-medium">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-surface-container-low px-6 py-3 border-b border-surface-container">
            <div className="flex justify-between text-xs font-medium text-on-surface-variant mb-1.5">
              <span>
                {remainingForFree === 0 ? (
                  <span className="text-secondary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    You've unlocked free standard delivery!
                  </span>
                ) : (
                  `Add $${remainingForFree.toFixed(2)} more for Free Shipping`
                )}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">potted_plant</span>
                <p className="font-title-lg text-lg text-on-surface mb-2">Your botanical basket is empty</p>
                <p className="text-sm text-on-surface-variant mb-6 max-w-xs">
                  Discover curated indoor plants and artisan planters for your living sanctuary.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-container transition-colors shadow-sm"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-4 p-3 rounded-xl bg-surface-bright border border-surface-container hover:border-outline-variant/50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg bg-surface-container shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-title-lg text-base font-semibold text-on-surface leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-on-surface-variant/70 hover:text-error transition-colors p-1"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {item.potSize} {item.planter !== 'None' && item.planter !== 'N/A' && `• ${item.planter}`}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-outline-variant rounded-md bg-surface">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                      <span className="font-title-lg font-semibold text-primary text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-surface-container bg-surface-container-low/50 flex flex-col gap-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-on-surface">
                    {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-outline-variant/30">
                <span className="font-title-lg text-lg text-on-surface font-semibold">Total</span>
                <span className="font-title-lg text-2xl font-bold text-primary">
                  ${(subtotal + shippingFee).toFixed(2)}
                </span>
              </div>

              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-4 bg-primary text-white text-center rounded-xl font-medium text-base hover:bg-primary-container transition-colors shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
