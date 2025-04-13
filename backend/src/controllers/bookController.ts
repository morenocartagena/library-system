import { Request, Response, RequestHandler} from 'express';
import mongoose from 'mongoose';
import BookModel from '../models/bookModel';

// GET: Get all books with search and filter options
export const getAllBooks = async (req: Request, res: Response) => {
    const { search, author, genre } = req.query;

    try {
        const filter: any = {};
        if (search) filter.title = { $regex: search, $options: 'i' }; // Case-insensitive title search
        if (author) filter.author = { $regex: author, $options: 'i' }; // Filter by author
        if (genre) filter.genre = { $regex: genre, $options: 'i' }; // Filter by genre

        const books = await BookModel.find(filter); 
        res.status(200).json(books); 
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error }); 
    }
};

// GET: Get book details by ID
export const getBookById: RequestHandler<{ id: string }> = async (req, res): Promise<void> => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid ID format' });
            return; 
        }

        const book = await BookModel.findById(id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return; 
        }

        res.status(200).json({ book });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving book details', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// POST: Add a new book (Librarian only)
export const addNewBook = async (req: Request, res: Response) => {
    const { title, author, publishedYear, genre, stock} = req.body;

    try {
        const newBook = new BookModel({ title, author, publishedYear, genre, stock }); 
        await newBook.save(); 
        res.status(201).json({ message: 'Book added successfully' }); 
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error }); 
    }
};

// PUT: Decrease stock when a book is checked out
export const checkoutBook: RequestHandler<{ id: string }> = async (req, res): Promise<void> => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid ID format' });
            return; 
        }

        const book = await BookModel.findById(id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        // Check if the book has stock available for checkout
        if (book.stock <= 0) {
            res.status(400).json({ message: 'Book is out of stock' });
            return; 
        }

        // Reduce the stock of the book by 1
        book.stock -= 1;
        await book.save();

        res.status(200).json({ message: 'Book checked out successfully', book });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error checking out book', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

// PUT: Increase stock when a book is returned
export const returnBook: RequestHandler<{ id: string }> = async (req, res): Promise<void> => {
    const { id } = req.params; 

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid ID format' });
            return; 
        }

        const book = await BookModel.findById(id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return; 
        }

        // Increase the stock of the book by 1 
        book.stock += 1;
        await book.save();

        res.status(200).json({ message: 'Book returned successfully', book });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error returning book', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};