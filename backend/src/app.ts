import express from 'express';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a test route for the application
app.get('/my-u-library/health-check', (req, res) => {
    res.send('Welcome to My U Library!');
});

export default app;