import { ProductModel } from '../products/products.model';
import { TOrder } from './orders.interface';
import { OrderModel } from './orders.model';

// service function for createOrder
const SaveOrderToDB = async (orderDetails: TOrder) => {
	const { product: productId, quantity: orderQuantity } = orderDetails;

	// find product from product collection
	const product = await ProductModel.findOne({ _id: productId });
	if (!product) {
		throw new Error('product not found');
	}

	if (product.quantity < orderQuantity) {
		throw new Error('stock not available');
	}

	const totalPrice = product.price * orderQuantity;

	// reduce product quantity and update inStock
	const updatedProduct = await ProductModel.findOneAndUpdate(
		{ _id: productId, quantity: { $gte: orderQuantity } },
		{
			$inc: { quantity: -orderQuantity },
			$set: { inStock: product.quantity - orderQuantity > 0 },
		},
		{ new: true }
	);

	if (!updatedProduct) {
		throw new Error('stock not available or product not found');
	}

	const result = await OrderModel.create({ ...orderDetails, totalPrice });

	return result;
};

// service function for getTotalRevenue
const CalculateTotalRevenue = async () => {
	try {
		const result = await OrderModel.aggregate([
			{
				$group: {
					_id: null,
					totalRevenue: {
						$sum: '$totalPrice',
					},
				},
			},
		]);

		// console.log(result);
		return result.length > 0 ? result[0].totalRevenue : 0;
	} catch (error) {
		throw new Error('error calculating total revenue');
	}
};

export const OrderServices = {
	SaveOrderToDB,
	CalculateTotalRevenue,
};
