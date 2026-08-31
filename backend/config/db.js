import dns from "dns";
import mongoose from "mongoose";

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

    console.log(
      `Database: ${conn.connection.name}`
    );

    return conn;
  } catch (error) {
    console.error(
      "MongoDB connection error:",
      error.message
    );

    throw error;
  }
};

export default connectDB;