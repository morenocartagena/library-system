import { Router } from 'express';
import { 
  createCheckout, 
  markAsReturned, 
  getActiveCheckouts, 
  getUserCheckouts // Importa el controlador para los checkouts de usuario
} from '../controllers/checkoutController';

const router = Router();

// Create a new checkout record
router.post('/', createCheckout);

// Mark a checkout as returned
router.put('/:id/return', markAsReturned);

// Fetch all active checkouts
router.get('/active', getActiveCheckouts);

// Fetch all checkouts for a specific user
router.get('/user/:userid', getUserCheckouts);

export default router;
