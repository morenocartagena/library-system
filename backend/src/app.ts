import express from 'express';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import checkoutRoutes from './routes/checkoutRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();

// TODO: Disable in Prod
// Enable CORS for all origins
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/my-u-library/users', userRoutes);
app.use('/my-u-library/books', bookRoutes);
app.use('/my-u-library/checkouts', checkoutRoutes);
app.use('/my-u-library/auth', authRoutes);

// Define a test route for the application
app.get('/my-u-library/health-check', (req, res) => {
    res.send('Welcome to My U Library!');
});

export default app;