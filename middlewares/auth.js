const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "no token";
    }
    req.user = jwt.verify(token, config.secretJwtToken)['user'];
    console.log(req.user);
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
