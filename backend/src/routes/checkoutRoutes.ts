import { Router } from 'express';
import { createCheckout, markAsReturned, getActiveCheckouts } from '../controllers/checkoutController';

const router = Router();

// Create a new checkout record
router.post('/', createCheckout);

// Mark a checkout as returned
router.put('/:id/return', markAsReturned);

// Fetch all active checkouts
router.get('/active', getActiveCheckouts);

export default router;