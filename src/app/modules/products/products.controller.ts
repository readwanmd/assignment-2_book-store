import { Request, Response } from 'express';
import { ProductServices } from './products.services';
import {
	PartialProductValidationSchema,
	ProductValidationSchema,
} from './products.validation';

// CreateProduct - POST
const CreateProduct = async (req: Request, res: Response) => {
	try {
		const book = req.body;
		// validate data
		const zodParsedData = ProductValidationSchema.parse(book);

		const result = await ProductServices.createProductIntoDB(zodParsedData);

		res.status(201).json({
			success: true,
			message: 'product created successfully',
			data: result,
		});
	} catch (error: any) {
		// zod validation failed
		if (error.name === 'ZodError') {
			res.status(400).json({
				success: false,
				message: 'validation failed',
				error: error.errors,
			});
			return;
		}
		res.status(500).json({
			success: false,
			message: 'something went wrong',
			error: error,
		});
	}
};

// GetAllProducts - GET
const GetAllProducts = async (_req: Request, res: Response) => {
	try {
		const result = await ProductServices.getAllProductsFromDB();

		res.status(200).json({
			success: true,
			message:
				result.length > 0
					? 'products successfully retrieved'
					: 'no products available',
			data: result,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: 'Something went wrong',
			error: error,
		});
	}
};

// GetSingleProduct - GET - find by _id
const GetSingleProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const result = await ProductServices.getSingleProductFromDB(productId);

		if (!result) {
			res.status(404).json({
				success: false,
				message: 'product with given id is not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'product retrieved successfully',
			data: result,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: 'Something went wrong',
			error: error,
		});
	}
};

// UpdateProduct - PATCH
const UpdateProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const updatedContent = req.body;
		const zodContent = PartialProductValidationSchema.parse(updatedContent);

		const result = await ProductServices.updateProductToDB(
			productId,
			zodContent
		);

		res.status(200).json({
			success: true,
			message: 'Products successfully updated',
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Something went wrong',
			error: error,
		});
	}
};

// DeleteProduct - DELETE - filter out with isDeleted flag
const DeleteProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;

		const result = await ProductServices.deleteProductFromDB(productId);
		console.log(result);

		res.status(200).json({
			success: true,
			message: 'Products deleted successfully',
			data: [],
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Something went wrong',
			error: error,
		});
	}
};

export const ProductControllers = {
	CreateProduct,
	GetAllProducts,
	GetSingleProduct,
	UpdateProduct,
	DeleteProduct,
};
