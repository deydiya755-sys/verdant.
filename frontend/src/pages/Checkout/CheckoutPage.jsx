import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { UPSELL_TOOLKIT } from '../../data/plants';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    addUpsellToolkit,
    subtotal,
    shippingFee,
    tax,
    grandTotal,
    recordOrder
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    email: 'eleanor.vane@sanctuary.com',
    firstName: 'Eleanor',
    lastName: 'Vane',
    address: '422 Greenery Haven Blvd, Apt 4B',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvc: '382'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasUpsell = cartItems.some(i => i.plantId === UPSELL_TOOLKIT.id);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setTimeout(() => {
      recordOrder(formData);
      setIsSubmitting(false);
      navigate('/care-dashboard');
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 max-w-[1280px] mx-auto px-5 md:px-[60px]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-surface-container pb-6 mb-10">
        <Link to="/shop" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Continue Botanical Shopping
        </Link>
        <div className="flex items-center gap-2 text-secondary text-xs font-semibold">
          <span className="material-symbols-outlined text-base">lock</span>
          256-Bit SSL Encrypted Checkout
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Cart Summary & Items */}
        <div className="md:col-span-7 flex flex-col gap-8">
          <div>
            <h1 className="font-display-lg text-3xl font-semibold text-on-surface mb-2">
              Review Your Order
            </h1>
            <p className="text-sm text-on-surface-variant">
              Every specimen is hand-inspected and secured in recyclable insulated packaging.
            </p>
          </div>

          {/* Cart Items List */}
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="p-8 text-center bg-surface-container-low rounded-2xl">
                <p className="text-sm text-on-surface-variant mb-4">No items currently in your cart.</p>
                <Link to="/shop" className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-lg">
                  Shop Houseplants
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-xl bg-surface-container shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-title-lg text-base font-semibold text-on-surface">
                          {item.name}
                        </h4>
                        <span className="font-title-lg font-semibold text-on-surface text-base">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {item.potSize} {item.planter !== 'None' && item.planter !== 'N/A' && `• ${item.planter}`}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-outline-variant rounded-lg bg-surface">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-xs text-on-surface-variant/70 hover:text-error transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Upsell Card (Plant Care Essentials) */}
          {!hasUpsell && (
            <div className="bg-surface-container-low p-6 rounded-2xl flex items-center gap-6 shadow-sm border border-surface-variant/50">
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden relative shadow-sm">
                <img
                  className="w-full h-full object-cover"
                  alt={UPSELL_TOOLKIT.name}
                  src={UPSELL_TOOLKIT.image}
                />
              </div>
              <div className="flex-grow">
                <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block">
                  Recommended Add-on
                </span>
                <h4 className="font-title-lg text-base font-semibold text-on-surface">
                  {UPSELL_TOOLKIT.name}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Brass mister, pruning shears, and organic root fertilizer to keep new arrivals thriving.
                </p>
              </div>
              <button
                type="button"
                onClick={addUpsellToolkit}
                className="shrink-0 text-xs font-semibold text-secondary border border-secondary px-5 py-3 rounded-xl hover:bg-secondary hover:text-white transition-colors duration-300"
              >
                Add • $24
              </button>
            </div>
          )}

          {/* Cost Totals Breakdown */}
          <div className="bg-surface-container-low/60 rounded-2xl p-6 border border-surface-container space-y-3 text-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Estimated Shipping (Insulated box)</span>
              <span className="font-medium text-on-surface">
                {shippingFee === 0 ? <span className="text-secondary font-semibold">Free</span> : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Estimated Tax (8%)</span>
              <span className="font-medium text-on-surface">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-outline-variant/30 pt-3 flex justify-between items-baseline">
              <span className="font-title-lg text-lg font-semibold text-on-surface">Order Total</span>
              <span className="font-title-lg text-2xl font-bold text-primary">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Form */}
        <div className="md:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="sticky top-28 bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xl flex flex-col gap-6"
          >
            {/* Contact */}
            <div>
              <h2 className="font-title-lg text-lg font-semibold text-on-surface mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                Contact Information
              </h2>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address for Care Guide updates"
                className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Delivery Address */}
            <div>
              <h2 className="font-title-lg text-lg font-semibold text-on-surface mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
                Sanctuary Delivery Address
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="col-span-2 w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="col-span-2 sm:col-span-1 w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                <div className="col-span-1 sm:col-span-1 grid grid-cols-2 gap-2">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-surface-bright border border-outline-variant rounded-xl px-2 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="NY">NY</option>
                    <option value="CA">CA</option>
                    <option value="WA">WA</option>
                    <option value="TX">TX</option>
                  </select>
                  <input
                    type="text"
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="ZIP"
                    className="w-full bg-surface-bright border border-outline-variant rounded-xl px-2 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="font-title-lg text-lg font-semibold text-on-surface mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">3</span>
                Payment Method
              </h2>
              <div className="border border-outline-variant rounded-xl overflow-hidden bg-surface-bright">
                {/* Credit Card Option */}
                <div
                  onClick={() => setPaymentMethod('credit')}
                  className={`p-3.5 border-b border-outline-variant flex items-center justify-between cursor-pointer ${
                    paymentMethod === 'credit' ? 'bg-surface-container-low' : 'bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="cc"
                      name="payment"
                      checked={paymentMethod === 'credit'}
                      onChange={() => setPaymentMethod('credit')}
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                    <label htmlFor="cc" className="text-sm font-medium text-on-surface cursor-pointer">
                      Credit / Debit Card
                    </label>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-xl">credit_card</span>
                </div>

                {paymentMethod === 'credit' && (
                  <div className="p-4 grid grid-cols-2 gap-3 bg-surface">
                    <div className="col-span-2 relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="Card Number"
                        className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-base">
                        lock
                      </span>
                    </div>
                    <input
                      type="text"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleChange}
                      placeholder="MM / YY"
                      className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      placeholder="CVC"
                      className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                )}

                {/* PayPal Option */}
                <div
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3.5 flex items-center justify-between cursor-pointer ${
                    paymentMethod === 'paypal' ? 'bg-surface-container-low' : 'bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="paypal"
                      name="payment"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                    <label htmlFor="paypal" className="text-sm font-medium text-on-surface cursor-pointer">
                      PayPal
                    </label>
                  </div>
                  <span className="text-xs font-bold text-blue-700">Pay<span className="text-blue-500">Pal</span></span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full py-4 bg-primary text-white rounded-xl font-medium text-base hover:bg-primary-container transition-all shadow-lg active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">autorenew</span>
                  Securing Sanctuary Order...
                </>
              ) : (
                <>
                  <span>Place Order • ${grandTotal.toFixed(2)}</span>
                  <span className="material-symbols-outlined text-base">verified</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-on-surface-variant leading-relaxed">
              By placing your order, you agree to Verdant's terms of service and our 30-day botanical guarantee.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
