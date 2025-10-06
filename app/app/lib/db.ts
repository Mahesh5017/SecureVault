import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;

  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) throw new Error("MONGODB_URI is not defined");

  try {
    const db = await mongoose.connect(mongoURI);
    isConnected = true;
    console.log("MongoDB connected:", db.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
