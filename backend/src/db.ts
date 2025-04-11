import mongoose from 'mongoose';
import dotenv from 'dotenv'; 

// Load environment variables
dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const uri = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const mongoDB = async () => {
    try {
        // Attempt to connect to the Atlas MongoDB database
        await mongoose.connect(uri);
        console.log('Successful connection to MongoDB');
    } catch (error) {
        // Log the error if the connection fails
        console.error('Error connecting to MongoDB:', (error as Error).message);
        process.exit(1);
    }
};

export default mongoDB;