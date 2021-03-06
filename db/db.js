const mongoose = require('mongoose');
const config = require('config');

module.exports = {
	connectDB: async () => {
		try {
			await mongoose.connect(config.get('mongoURI'), {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false,
				useUnifiedTopology: true
			});

			console.log('MongoDB Connected...');
		} catch (err) {
			console.error(err.message);
			// Exit process with failure
			process.exit(1);
		}
	},

	disconnectDB: async () => {
		try {
			await mongoose.connection.close()
			console.log('MongoDB disonnected...');
		} catch (err) {
			console.error(err.message);
			// Exit process with failure
			process.exit(1);
		}
	}
}
