import { z } from 'zod';

const OrderValidationSchema = z.object({
	email: z.string().email({ message: 'invalid email format' }),
	product: z.string().min(1, 'product id is required'),
	quantity: z.number().min(1, { message: 'quantity must be at least 1' }),
	totalPrice: z.number().optional(),
});

export default OrderValidationSchema;
