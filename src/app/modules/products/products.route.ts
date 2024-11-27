import express from 'express';
import { ProductControllers } from './products.controller';

const router = express.Router();

router.post('/', ProductControllers.CreateProduct);
router.get('/', ProductControllers.GetAllProducts);
router.get('/:productId', ProductControllers.GetSingleProduct);
router.patch('/:productId', ProductControllers.UpdateProduct);
router.delete('/:productId', ProductControllers.DeleteProduct);

export const ProductRoutes = router;
