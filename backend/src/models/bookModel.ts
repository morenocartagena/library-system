import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
    stock: number; 
}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        publishedYear: { type: Number, required: true },
        genre: { type: String, required: true },
        stock: { type: Number, required: true, default: 5 }, 
    },
    {
        timestamps: true, 
    }
);

const BookModel = mongoose.model<IBook>('Book', BookSchema);

export default BookModel;