import mongoose from 'mongoose';

export type TOrder = {
	email: string;
	product: mongoose.Types.ObjectId | string;
	quantity: number;
	totalPrice?: number;
};
