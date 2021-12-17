// middleware/auth.js
const UnauthorizeError = require("../utils/errors/UnauthorizeError");

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizeError("Authorization Required");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    throw new UnauthorizeError("Authorization Required");
  }

  req.user = payload;

  return next();
};
