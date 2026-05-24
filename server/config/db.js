const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI is not configured.');
  }

  if (uri.includes('YOUR_PASSWORD')) {
    throw new Error('Replace YOUR_PASSWORD in MONGO_URI with your MongoDB Atlas database user password.');
  }

  mongoose.set('strictQuery', true);
  const connection = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log(`MongoDB connected: ${connection.connection.host}`);

  return connection;
}

module.exports = connectDB;
