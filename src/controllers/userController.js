const {
  responseSuccess,
  responseCreated,
  responseInternalServerError,
  responseBadRequest,
} = require("../utils/response");
const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userData = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userData && (await bcrypt.compare(password, userData.password))) {
      const token = jwt.sign(
        { name: userData.name, username: userData.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2h" }
      );
      return responseSuccess(res, { token: token }, "login berhasil");
    } else {
      return responseBadRequest(res);
    }
  } catch (err) {
    return responseInternalServerError(res, "internal server error", err);
  }
};

const register = async (req, res) => {
  let { name, username, password, email, address, phoneNumber } = req.body;

  try {
    password = await bcrypt.hash(password, 15);
    const createUser = await prisma.user.create({
      data: {
        name,
        username,
        password,
        email,
        address,
        phoneNumber,
      },
      select: {
        name: true,
        username: true,
        email: true,
        address: true,
        phoneNumber: true,
        profilePhotoPath: true,
      },
    });

    return responseCreated(res, createUser, "register success");
  } catch (err) {
    return responseInternalServerError(res, err);
  }
};

const getProfile = async (req, res) => {
  const { authorization } = req.headers;

  try {
    const { username } = await jwt.verify(
      authorization,
      process.env.JWT_SECRET_KEY
    );

    const userData = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        name: true,
        username: true,
        email: true,
        address: true,
        phoneNumber: true,
        profilePhotoPath: true,
      },
    });

    return responseSuccess(res, userData);
  } catch (err) {
    console.log(err);
  }
};

const updateProfile = async (req, res) => {
  const { name, email, address, phoneNumber } = req.body;
  const token = req.headers.authorization;

  try {
    const { username } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    await prisma.user.update({
      where: {
        username,
      },
      data: {
        name,
        email,
        address,
        phoneNumber,
      },
    });
    return responseSuccess(res, undefined, "profile berhasil diupdate");
  } catch (err) {
    return responseInternalServerError(res, "internal server error");
  }
};

module.exports = { login, register, getProfile, updateProfile };
