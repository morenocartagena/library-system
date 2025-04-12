import { Router } from 'express';
import { 
    getAllBooks, 
    getBookById, 
    addNewBook, 
    checkoutBook, 
    returnBook 
} from '../controllers/bookController';

const router = Router();

// Get all books with search or filter
router.get('/', getAllBooks);

// Get book details by ID
router.get('/:id', getBookById);

// Add a new book (Librarian only)
router.post('/', addNewBook);

// Decrease stock when a book is checked out
router.put('/:id/checkout', checkoutBook);

// Increase stock when a book is returned
router.put('/:id/return', returnBook);

export default router;