// api/utils/tokenService.js
const jwt = require('jsonwebtoken');
const { SECRET } = require('./constants');

exports.create = (user) => {
  const { _id: id } = user;

  const payload = {
    user: {
      id,
    },
  };

  return jwt.sign(payload, SECRET);
};

const verify = token => jwt.verify(token, SECRET);
