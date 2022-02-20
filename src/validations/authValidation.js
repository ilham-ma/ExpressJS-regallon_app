const jwt = require("jsonwebtoken");
const { responseUnauthorize } = require("../utils/response");

const authenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  //   console.log(authorization);

  if (!authorization) return responseUnauthorize(res, "Harap login dulu");
  try {
    await jwt.verify(authorization, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    return responseUnauthorize(res, "Harap login dulu");
  }
};

module.exports = { authenticated };
