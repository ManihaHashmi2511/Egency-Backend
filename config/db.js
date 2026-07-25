const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000, 
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
  });

  isConnected = db.connections[0].readyState === 1;
  console.log("MongoDB connected");
};

module.exports = connectDB;