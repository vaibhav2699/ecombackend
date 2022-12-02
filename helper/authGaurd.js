const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");

module.exports = {
  createToken: (data_id, email) => {
    return jwt.sign({ user_id: data_id, email }, CONFIG.jwt.JWTSECRETKEY, {
      expiresIn: CONFIG.jwt.JWTEXPIRY,
    });
  },
};
