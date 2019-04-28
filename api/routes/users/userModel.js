'use strict';

//require mongoose to talk to the mongodb database
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
//
const { Schema } = mongoose;

const userSchema = exports.schema = new Schema({
//  id: String, not necessary mongodb will create this
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
});

// Users is the name of the collection in mongodb
// Name of collection is plural, schema is singular

// userSchema.methods.comparePassword = function (password) {
// 	console.log(this, "this");
// 	console.log(password, this.password);
	// password is the password submitted at this moment being compared!
	// this.password is the password of the email address in the database!
	// return bcrypt.compare(password, this.password);
// };

exports.model = mongoose.model('Users', userSchema);
