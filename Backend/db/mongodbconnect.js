// db/mongodbconnect.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();


const MONGO_URI="mongodb+srv://arunkarthiks22cse:CIgECQZIk2bUmdoo@cluster0.aeoqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const dbconnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    throw err; // Throw the error to handle it later
  }
};

export default dbconnect;
