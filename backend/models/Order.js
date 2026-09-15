import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  date: { type: String },
  arrivalDate: { type: String },
  items: [mongoose.Schema.Types.Mixed],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String
  },
  payment: {
    method: String,
    status: String
  },
  careRegimenGenerated: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
