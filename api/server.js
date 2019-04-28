'use strict';

const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// 1. Create main express intance
const app = express();

// 2. Require utility function for adding middleware
const {
	applyMiddleware
} = require('./utils');
// 3a. Require general middleware
const middleWare = require('./middleware');
applyMiddleware(middleWare, app);




// 4. Require routes
// const {
// 	router: bookRoutes
// } = require('./routes/books/bookRoutes');

// router is from userRoutes
const { router: userRoutes } = require('./routes/users/userRoutes');
const { router: crystalRoutes } = require('./routes/crystals/crystalRoutes');
//body parser has to be first, for express to connect things.
app.use('/api/users', userRoutes);
//emma.com/api/users reference crystalRoutes file
app.use('/api/crystals', crystalRoutes);


// 5. Require conatants
const { PORT } = require('./utils/constants');

// 7. Utilise routes
// router.use('/api/books', bookRoutes);

// 3b. Require error handling middleware
const errorHandlers = require('./middleware/errorHandlers');
// 8. Apply error handling middleware (meaningfully last)
applyMiddleware(errorHandlers, app);

const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/crystals';
// console.log("hello");
mongoose
	.connect(URL, {
		useNewUrlParser: true
	})
	.then(async () => {
		console.log(`Connected to database at: ${URL}`);
		// 10. Start server
		app.listen(PORT, () => {
			console.log(`Server is running on PORT:${PORT}`);
			if (process.send) {
				// NOTE: process is being run by pm2
				process.send('ready');
			}
		});
	});
