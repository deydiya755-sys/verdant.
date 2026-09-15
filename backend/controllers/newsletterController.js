import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const subscribersFilePath = path.join(__dirname, '../data/subscribers.json');

const loadSubscribers = () => {
  try {
    const data = fs.readFileSync(subscribersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveSubscribers = (subs) => {
  fs.writeFileSync(subscribersFilePath, JSON.stringify(subs, null, 2), 'utf8');
};

export const subscribeNewsletter = (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const subscribers = loadSubscribers();
    const cleanEmail = email.trim().toLowerCase();

    const exists = subscribers.some(s => s.email.toLowerCase() === cleanEmail);
    if (exists) {
      return res.json({
        success: true,
        message: 'You are already part of our Mindful Growers community! Welcome back.'
      });
    }

    subscribers.push({
      email: cleanEmail,
      subscribedAt: new Date().toISOString()
    });
    saveSubscribers(subscribers);

    return res.status(201).json({
      success: true,
      message: 'Welcome to the Verdant Sanctuary circle! Care tips are on their way.'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error processing subscription', error: error.message });
  }
};
