import express from 'express';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import checkoutRoutes from './routes/checkoutRoutes';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/my-u-library/users', userRoutes);
app.use('/my-u-library/books', bookRoutes);
app.use('/my-u-library/checkouts', checkoutRoutes);

// Define a test route for the application
app.get('/my-u-library/health-check', (req, res) => {
    res.send('Welcome to My U Library!');
});

export default app;