'use strict';

const { model: Crystal } = require('./crystalModel');
// const { model: Power } = require('./powerModel');

exports.listCrystals = async () => {
 return await Crystal.find({});
};

exports.createCrystal = async (crystalData) => {
 try {
   const crystal = new Crystal(crystalData);
   return await crystal.save();
 } catch (e) {
   throw e;
 }
};

// exports.createPowers = async (body) => {
// 	const { powers } = body;
// 	console.log(powers);
// 	try {
// 		powers.map( async (power) => {
// 			const powerItem = new Power(power);
// 			return await powerItem.save();
// 		});
// 	} catch (e) {
// 		throw e;
// 	}
// };
