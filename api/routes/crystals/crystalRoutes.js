'use strict';

const express = require('express');
const router = express.Router();

const crystalService = require('./crystalService');

// GET /crystals/
router.route('/')
	.get(async (req, res, next) => {
		try {
			const crystals = await crystalService.listCrystals();
			res.json({
				data: crystals,
			});
		} catch (e) {
			console.log(e);
			next(e);
		}
	})
	// POST /crystal/ (create new crystal)
	.post(async (req, res, next) => {
		// req.body is the entire json object
		try {
			const crystal = await crystalService.createCrystal(req.body);
			res.status(201).json({
				data: [crystal],
			});
		} catch (e) {
			console.log(e);
			next(e);
		}
	});

exports.router = router;
