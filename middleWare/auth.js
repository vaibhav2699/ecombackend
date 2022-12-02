const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");

const verifyToken = (req, res, next) => {

  const token =
    // req.body.token ||
    // req.query.token ||
    req.headers["authorization"];
  // req.headers["Authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], CONFIG.jwt.JWTSECRETKEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
