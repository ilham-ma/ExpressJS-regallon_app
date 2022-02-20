const { responseBadRequest } = require("../utils/response");

const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validateRegister = (req, res, next) => {
  const { name, username, password, email, address, phoneNumber } = req.body;

  if (!name || !username || !password || !email || !address || !phoneNumber)
    return responseBadRequest(res);

  if (!validateEmail(email)) return responseBadRequest(res);

  if (password.length < 5) return responseBadRequest(res);

  next();
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) return responseBadRequest(res);

  next();
};

const validateProfile = (req, res, next) => {
  const { name, email, address, phoneNumber } = req.body;

  if (!name || !email || !address || !phoneNumber)
    return responseBadRequest(res, "data tidak lengkap");

  if (!validateEmail(email))
    return responseBadRequest(res, "format email salah");

  next();
};

module.exports = { validateLogin, validateRegister, validateProfile };
