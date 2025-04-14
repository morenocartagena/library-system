import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel'; 

// POST: Add a new user (Librarian only)
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, role } = req.body;
    const defaultPassword = process.env.DEFAULT_PASSWORD;
  
    if (!defaultPassword) {
      res.status(500).json({ message: 'Default password not configured.' });
      return;
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      const newUser = new UserModel({ firstName, lastName, email, role, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  };

// GET: Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({}, 'firstName lastName email role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};