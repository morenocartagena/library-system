import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers/userController';

const router = Router();

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

export default router;