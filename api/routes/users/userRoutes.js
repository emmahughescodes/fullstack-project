'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./userService');
// const { model:UserModel } = require('./userModel')
const UserModel = require('./userModel').model;
const tokenService = require('../../utils/tokenService');
const requiresAuth = require('../../middleware/auth');

// GET /users/
router.route('/')
	// .get(async (req, res, next) => {
	// 	try {
	// 		const crystals = await cohortService.listCrystals();
	// 		res.json({
	// 			data: cohorts,
	// 		});
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// })
	// POST /cohorts/ (create new cohort)
	.post(async (req, res, next) => {
		const { body } = req;
		try {
			const user = await userService.createUser(body);
			res.status(201).json({
				data: [user],
			});
		} catch (e) {
			next(e);
		}
	});

	// login
	router.route('/login')
		// POST /login/ (create new cohort)
		.post(async (req, res, next) => {
			console.log('req body', req.body);
			const { email, password } = req.body;
			try {
				const user = await UserModel.find({ email });
				console.log(user, "hey im a user");
				if ( user === undefined || user.length == 0 ) {
					//createUser...
					console.log("start new user");
					const salt = bcrypt.genSaltSync(10);
					const hash = bcrypt.hashSync(password, salt);
					console.log(hash, "HASH" );
					console.log(email, "EMAIL");
					const user = new UserModel({ email, password:hash });
					console.log(user, "UUSER");
					const newUser = await user.save();
					console.log(newUser, "NEWUSER");
					console.log("end new user");
					res.status(200).json({
						data: [newUser],
					});
				} else {
					// const innerUser = new UserModel(user);
					// console.log(password, "passw");
					// const match = await innerUser.comparePassword(password);

					// take in user's pw and encrypt it, and then compare against existing database passwords
					const match = await bcrypt.compare(password, user[0].password);


					// console.log("thecurrentpw", password);
					// console.log("thedbpw", user[0]);
					// console.log(match, "matchypoo");

					if (match) {

						//change from issueToken to create
						const token = tokenService.create(user);
						console.log(token, "token");
						res.status(200).json({
							data: {
								token,
								user: user[0]
							},
						});
						console.log(match, "");
						return;
					} else {
						next(new Error('unauthorized'));
					}
      	}
			} catch (e) {
				console.log(e, "maday");
				next(e);
			}
	});

// signup
router.route('/signup')
	// POST /login/ (create new cohort)
	.post(async (req, res, next) => {
		console.log('req body', req.body);
		const {
			email,
			password
		} = req.body;
		try {
			const user = await UserModel.find({
				email
			});
			console.log(user, "hey im a user");
			if (user === undefined || user.length == 0) {
				//createUser...
				console.log("start new user");
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				console.log(hash, "HASH");
				console.log(email, "EMAIL");
				const user = new UserModel({
					email,
					password: hash
				});
				console.log(user, "UUSER");
				const newUser = await user.save();
				console.log(newUser, "NEWUSER");
				console.log("end new user");
				res.status(200).json({
					data: [newUser],
				});
			} else {
				// const innerUser = new UserModel(user);
				// console.log(password, "passw");
				// const match = await innerUser.comparePassword(password);

				// take in user's pw and encrypt it, and then compare against existing database passwords
				const match = await bcrypt.compare(password, user[0].password);


				// console.log("thecurrentpw", password);
				// console.log("thedbpw", user[0]);
				// console.log(match, "matchypoo");

				if (match) {
					//change from issueToken to create
					const token = tokenService.create(user);
					console.log(token, "token");
					res.status(200).json({
						data: [token],
					});
					console.log(match, "");
				} else {
					next(new Error('unauthorized'));
				}
			}
		} catch (e) {
			console.log(e, "maday");
			next(e);
		}
	});



	router
		.route('/me')
		.get(requiresAuth, async (req, res, next) => {
			try {
				if (!req.token) {
					next(new Error('unauthorized'));
				} else {
					const user = await UserModel.findById(req.token.user.id);
					if (!user) {
						next(new Error('unauthorized'));
					} else {
						res.json({
							data: [user],
						});
					}
				}
			} catch (e) {
				next(e);
			}
		});

exports.router = router;
