import { Request, Response } from 'express';
import { OrderServices } from './orders.services';

// createOrder - POST
const createOrder = async (req: Request, res: Response) => {
	try {
		const order = req.body;

		const result = await OrderServices.SaveOrderToDB(order);
		// console.log({ result });

		res.status(200).json({
			success: true,
			message: 'order saved successfully',
			data: result,
		});
	} catch (error: any) {
		// console.log(error);

		if (error.message === 'product not found') {
			res.status(404).json({
				success: false,
				message: 'product not found',
			});
		}

		if (error.message === 'stock not available') {
			res.status(400).json({
				success: false,
				message: 'stock not available',
			});
		}

		res.status(500).json({
			success: false,
			message: 'something went wrong',
			error: error,
		});
	}
};

// getTotalRevenue - GET
const getTotalRevenue = async (req: Request, res: Response) => {
	try {
		const totalRevenue = await OrderServices.CalculateTotalRevenue();

		res.status(200).json({
			message: 'revenue find successfully',
			status: true,
			data: {
				totalRevenue,
			},
		});
	} catch (error: any) {
		res.status(500).json({
			message: 'something went wrong',
			status: false,
			error: error.message,
		});
	}
};

export const OrderControllers = {
	createOrder,
	getTotalRevenue,
};
