import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
}

const UserSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, enum: ['student', 'librarian'], default: 'student' },
        password: { type: String, required: true },
    },
    {
        timestamps: true, 
    }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;