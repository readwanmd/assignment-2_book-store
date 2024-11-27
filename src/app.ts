import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { OrderRoutes } from './app/modules/orders/orders.route';
import { ProductRoutes } from './app/modules/products/products.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// root route
app.get('/', (_req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'Server is running',
	});
});

export default app;
