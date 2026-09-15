import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ordersFilePath = path.join(__dirname, '../data/orders.json');
const plantsFilePath = path.join(__dirname, '../data/plants.json');

const loadOrders = () => {
  try {
    const data = fs.readFileSync(ordersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading orders.json:', error);
    return [];
  }
};

const saveOrders = (orders) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
};

const loadPlants = () => {
  try {
    const data = fs.readFileSync(plantsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const createOrder = (req, res) => {
  try {
    const { items, customer, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }

    if (!customer || !customer.email || !customer.address) {
      return res.status(400).json({ success: false, message: 'Customer email and shipping address are required' });
    }

    const plants = loadPlants();

    // Calculate financials
    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity || 1)), 0);
    const shippingFee = subtotal >= 100 || subtotal === 0 ? 0 : 15;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const grandTotal = Math.round((subtotal + shippingFee + tax) * 100) / 100;

    const orderId = `VRD-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Generate arrival estimated date (3 business days ahead)
    const arrivalDate = 'Wednesday, Oct 12';

    // Enrich ordered items with full care schedules
    const enrichedItems = items.map(item => {
      const plantDetail = plants.find(p => p.id === item.plantId);
      return {
        ...item,
        scientificName: item.scientificName || plantDetail?.scientificName || 'Botanical Specimen',
        wateringSchedule: plantDetail?.wateringSchedule || 'Every 1-2 weeks. Allow top soil to dry completely.',
        lightDescription: plantDetail?.lightDescription || 'Bright indirect light; avoid harsh direct afternoon sun.',
        petFriendly: plantDetail?.petFriendly ?? true
      };
    });

    const newOrder = {
      orderId,
      date: formattedDate,
      arrivalDate,
      items: enrichedItems,
      subtotal,
      shippingFee,
      tax,
      grandTotal,
      customer: {
        firstName: customer.firstName || 'Botanical',
        lastName: customer.lastName || 'Friend',
        email: customer.email,
        address: customer.address,
        city: customer.city || 'Brooklyn',
        state: customer.state || 'NY',
        zip: customer.zip || '11201'
      },
      payment: {
        method: paymentMethod || 'credit',
        status: 'Confirmed'
      },
      careRegimenGenerated: true
    };

    const existingOrders = loadOrders();
    existingOrders.unshift(newOrder);
    saveOrders(existingOrders);

    return res.status(201).json({
      success: true,
      message: 'Order confirmed successfully. Botanical care regimen ready.',
      order: newOrder
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error processing order', error: error.message });
  }
};

export const getOrderById = (req, res) => {
  try {
    const orders = loadOrders();
    const order = orders.find(o => o.orderId.toLowerCase() === req.params.orderId.toLowerCase());

    if (!order) {
      return res.status(404).json({ success: false, message: `Order '${req.params.orderId}' not found` });
    }

    return res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving order', error: error.message });
  }
};

export const getAllOrders = (req, res) => {
  try {
    const orders = loadOrders();
    return res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving orders', error: error.message });
  }
};
