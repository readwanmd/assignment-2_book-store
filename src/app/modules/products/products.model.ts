import mongoose from 'mongoose';
import { TProduct } from './products.interface';

export const ProductSchema = new mongoose.Schema<TProduct>(
	{
		title: {
			type: String,
			required: [true, 'title is required'],
		},
		author: {
			type: String,
			required: [true, 'author is required'],
		},
		category: {
			type: String,
			enum: {
				values: [
					'Fiction',
					'Science',
					'SelfDevelopment',
					'Poetry',
					'Religious',
				],
				message:
					'{VALUE} is not a valid category, category must be one of the following: Fiction, Science, SelfDevelopment, Poetry, Religious',
			},
			required: [true, 'category is required'],
		},
		description: {
			type: String,
			required: [true, 'description is required'],
		},
		price: {
			type: Number,
			required: [true, 'price is required'],
		},
		inStock: {
			type: Boolean,
			default: true,
		},
		quantity: {
			type: Number,
			required: [true, 'quantity is required'],
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// pre hook for filter out deleted items
ProductSchema.pre('find', function (next) {
	this.find({ isDeleted: { $ne: true } });

	next();
});

ProductSchema.pre('findOne', function (next) {
	this.find({ isDeleted: { $ne: true } });

	next();
});

export const ProductModel = mongoose.model<TProduct>('Product', ProductSchema);
