import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI;
    if (!connStr) {
      console.warn('⚠️ MONGO_URI is not set in environment variables.');
      return false;
    }

    if (connStr.includes('<') || connStr.includes('>')) {
      console.warn('⚠️ MONGO_URI contains placeholder brackets (<...>). Please replace with your actual MongoDB password in backend/.env');
    }

    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`🍃 MongoDB Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes('authentication failed')) {
      console.error('👉 Tip: Check your database user password in backend/.env (ensure special characters are URL encoded if needed).');
    }
    return false;
  }
};

export default connectDB;
