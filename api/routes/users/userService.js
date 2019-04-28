'use strict';

//require the user model
const { model: User } = require('./userModel');

exports.listUsers = async () => {
 return await User.find({});
};

// creating a new user instance here based off of the userModel
// when you user.save() the instance, it is written to the database
exports.createUser = async (userData) => {
 try {
   const user = new User(userData);
   return await user.save();
 } catch (e) {
   throw e;
 }
};

