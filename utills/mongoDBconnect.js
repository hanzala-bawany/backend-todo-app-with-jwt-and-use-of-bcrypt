import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log(process.env.MONGO_URI)

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export {connectDB}