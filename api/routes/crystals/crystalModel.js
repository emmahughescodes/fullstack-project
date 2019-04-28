'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const { schema: powerSchema } = require('../crystals/powerModel');
const { schema: userSchema } = require('../users/userModel');

const crystalSchema = exports.schema = new Schema({
//  id: String, not necessary mongodb will create this id automatically
 name: { type: String, required: true },
 region: { type: String },
 colour: { type: String, required: true },
 chakra: {
	type: String,
	required: true,
 	enum: [
 		'root',
 		'sacral',
 		'heart',
		'throat',
		'thirdeye',
		'crown'
 	]
 },
 //mongoose will know its a list of powerSchemas
//  powers: [ powerSchema ],
//  powers: [
// 	 {
// 		 type: Schema.Types.ObjectId,
		//  reference the documents inside the "Powers" collection
// 		 ref: "Powers"
// 	 }
//  ],
 powers: [{
 	type: String
 }],
 uid: {
	 type: Schema.Types.ObjectId,
	 ref: "Users"
	},
//  picture: { type: String },
});

// crystals is the name of the collection in mongodb
// Name of collection is plural, schema is singular
// This schema is connected to this collection
// if the colln doesnot exist, it will create it for us
// model function will return to you, a tool/vehical that can be used to access the information
// tool will allow you to find and create new instances of that schema
// exporting as a model property
exports.model = mongoose.model('Crystals', crystalSchema);
