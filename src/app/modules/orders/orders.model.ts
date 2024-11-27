import mongoose, { Schema } from 'mongoose';
import { TOrder } from './orders.interface';

export const OrderSchema = new Schema<TOrder>(
	{
		email: {
			type: String,
			required: [true, 'email is required'],
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		quantity: {
			type: Number,
			required: [true, 'quantity is required'],
			min: 1,
		},
		totalPrice: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export const OrderModel = mongoose.model('Order', OrderSchema);
