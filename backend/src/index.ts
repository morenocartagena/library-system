import app from './app'; 
import mongoDB from './db';
import dotenv from 'dotenv'; 

// Load environment variables
dotenv.config();

// Define the port
const port = process.env.PORT || 3000;

const startApp = async () => {
    try {
        // Connect to MongoDB
        await mongoDB();

        // Start the Express server
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}/my-u-library/health-check`);
        });
    } catch (error) {
        console.error(
            'An error occurred while starting the application:',
            (error as Error).message
        );
        process.exit(1);
    }
};

startApp();