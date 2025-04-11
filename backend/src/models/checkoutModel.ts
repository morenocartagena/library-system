import mongoose, { Schema, Document } from 'mongoose';

export interface ICheckout extends Document {
    userId: mongoose.Types.ObjectId; 
    bookId: mongoose.Types.ObjectId;
    checkoutDate: Date;
    returnDate: Date;
    status: string; // 'checked_out' or 'returned'
}

const CheckoutSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, 
        bookId: { type: mongoose.Types.ObjectId, ref: 'Book', required: true },
        checkoutDate: { type: Date, required: true, default: Date.now }, 
        returnDate: { type: Date }, 
        status: { type: String, required: true, default: 'checked_out' }, 
    },
    {
        timestamps: true, 
    }
);

const CheckoutModel = mongoose.model<ICheckout>('Checkout', CheckoutSchema);

export default CheckoutModel;