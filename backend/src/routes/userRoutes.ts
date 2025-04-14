import { Router } from 'express';
import { createUser, getAllUsers, getUserIdByEmail } from '../controllers/userController';

const router = Router();

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

router.get('/email/:email', getUserIdByEmail);

export default router;