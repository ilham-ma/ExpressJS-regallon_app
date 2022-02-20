const responseHandler = (res, status, msg) => {
  return res.status(status).json(msg);
};

const responseSuccess = (res, data = undefined, msg = undefined) => {
  return responseHandler(res, 200, {
    message: "success",
    data: data,
    message: msg,
  });
};

const responseBadRequest = (res, msg = undefined, err = undefined) => {
  return responseHandler(res, 400, { message: msg, error: err });
};

const responseNotFound = (res) => {
  return responseHandler(res, 404, { message: "not found" });
};

const responseConflict = (res, msg = undefined, err = undefined) => {
  return responseHandler(res, 409, { message: msg, error: err });
};

const responseCreated = (res, data = undefined, msg = undefined) => {
  return responseHandler(res, 201, { data: data, message: msg });
};

const responseInternalServerError = (res, msg = undefined, err = undefined) => {
  return responseHandler(res, 500, {
    message: msg,
    error: err,
  });
};

const responseUnauthorize = (res, msg, err = undefined) => {
  return responseHandler(res, 401, { message: msg, error: err });
};

const responseForbiden = (res, msg = undefined, err = undefined) => {
  return responseHandler(res, 403, { message: msg, error: err });
};

module.exports = {
  responseSuccess,
  responseNotFound,
  responseBadRequest,
  responseConflict,
  responseCreated,
  responseInternalServerError,
  responseUnauthorize,
  responseForbiden,
};
