import express from 'express';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

// Define a test route for the application
app.get('/my-u-library/health-check', (req, res) => {
    res.send('Welcome to My U Library!');
});

export default app;