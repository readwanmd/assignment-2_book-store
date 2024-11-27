import { TProduct } from './products.interface';
import { ProductModel } from './products.model';

// service function for CreateProduct
const createProductIntoDB = async (product: TProduct) => {
	const result = await ProductModel.create(product);

	return result;
};

// service function for GetAllProducts
const getAllProductsFromDB = async () => {
	const products = await ProductModel.find();

	return products;
};

// service function for GetSingleProduct - find by _id
const getSingleProductFromDB = async (id: string) => {
	const product = await ProductModel.findOne({ _id: id });

	return product;
};

// service function for UpdateProduct
const updateProductToDB = async (id: string, content: object) => {
	const result = await ProductModel.findOneAndUpdate(
		{ _id: id },
		{ ...content },
		{ new: true }
	);

	return result;
};

// service function for DeleteProduct
const deleteProductFromDB = async (id: string) => {
	const result = await ProductModel.updateOne({ _id: id }, { isDeleted: true });

	return result;
};

export const ProductServices = {
	createProductIntoDB,
	getAllProductsFromDB,
	getSingleProductFromDB,
	updateProductToDB,
	deleteProductFromDB,
};
