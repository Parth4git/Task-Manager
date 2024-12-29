import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 


const mongoUrl = process.env.MONGODB_URL;

async function db() {
   
try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to database');
    
} catch (error) {
 
    console.error('Error connecting to database:', error);
}
} 
export default db;