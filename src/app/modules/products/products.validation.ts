import { z } from 'zod';

export const ProductValidationSchema = z.object({
	title: z.string().min(1, 'title is required'),
	author: z.string().min(1, 'author is required'),
	category: z.enum(
		['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
		{
			errorMap: () => ({
				message:
					'category must be one of the following: Fiction, Science, SelfDevelopment, Poetry, Religious',
			}),
		}
	),
	description: z.string().min(1, 'description is required'),
	price: z
		.number()
		.positive('price must be greater than 0')
		.or(z.number().int()),
	inStock: z.boolean().optional().default(true),
	quantity: z
		.number()
		.int()
		.nonnegative('quantity must be a non-negative integer')
		.min(1, 'quantity is required'),
});

// validate while update
export const PartialProductValidationSchema = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	category: z
		.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
			errorMap: () => ({
				message:
					'category must be one of the following: Fiction, Science, SelfDevelopment, Poetry, Religious',
			}),
		})
		.optional(),
	description: z.string().optional(),
	price: z
		.number()
		.nonnegative({ message: 'Price must be a positive number' })
		.optional(),
	inStock: z.boolean().optional(),
	quantity: z
		.number()
		.int()
		.nonnegative({ message: 'Quantity must be a positive integer' })
		.optional(),
});
