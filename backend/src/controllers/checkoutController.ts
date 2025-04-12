import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import CheckoutModel from '../models/checkoutModel';
import BookModel from '../models/bookModel';

// POST: Create a checkout record
export const createCheckout: RequestHandler = async (req, res): Promise<void> => {
    const { bookId, userId } = req.body; // Expect bookId and userId from the request body

    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({ message: 'Invalid book ID format' });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'Invalid user ID format' });
            return;
        }

        // Fetch the book by ID
        const book = await BookModel.findById(bookId);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        // Check if the book is in stock
        if (book.stock <= 0) {
            res.status(400).json({ message: 'Book is out of stock' });
            return;
        }

        // Create a new checkout record
        const checkout = new CheckoutModel({
            bookId,
            userId,
            checkoutDate: new Date(),
            status: 'checked_out'
        });
        await checkout.save();

        // Decrease the stock of the book
        book.stock -= 1;
        await book.save();

        // Respond with the new checkout record
        res.status(201).json({ message: 'Checkout created successfully', checkout });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error creating checkout', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// PUT: Mark a checkout as returned
export const markAsReturned: RequestHandler<{ id: string }> = async (req, res): Promise<void> => {
    const { id } = req.params; 

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid checkout ID format' });
            return;
        }

        // Find the checkout record by ID
        const checkout = await CheckoutModel.findById(id);
        if (!checkout) {
            res.status(404).json({ message: 'Checkout record not found' });
            return;
        }

        // Check if the checkout record is already marked as returned
        if (checkout.status === 'returned') {
            res.status(400).json({ message: 'Book is already returned' });
            return;
        }

        // Mark the checkout record as returned
        checkout.returnDate = new Date();
        checkout.status = 'returned';
        await checkout.save();

        // Increase the stock of the book
        const book = await BookModel.findById(checkout.bookId);
        if (book) {
            book.stock += 1;
            await book.save();
        }

        // Respond with the updated checkout record
        res.status(200).json({ message: 'Book returned successfully', checkout });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error returning book', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// GET: Fetch all active checkouts
export const getActiveCheckouts: RequestHandler = async (req, res): Promise<void> => {
    try {
        // Query all checkouts with status 'checked_out'
        const activeCheckouts = await CheckoutModel.find({ status: 'checked_out' }).populate('bookId').populate('userId');

        res.status(200).json({ message: 'Active checkouts retrieved successfully', activeCheckouts });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving active checkouts', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};