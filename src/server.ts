import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

// main function to start the server
async function main() {
	try {
		await mongoose.connect(config.database_url as string);

		app.listen(config.port, () => {
			console.log(`App listening on ${config.port}`);
		});
	} catch (error) {
		console.log(error);
	}
}

main();
