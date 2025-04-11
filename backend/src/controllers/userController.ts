import { Request, Response } from 'express';
import UserModel from '../models/userModel'; 

// POST: Add a new user (Librarian only)
export const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, role } = req.body;

    try {
        const newUser = new UserModel({ firstName, lastName, email, role });
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