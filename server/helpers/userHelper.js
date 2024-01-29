const responseSuccess = (res, status, statusMessage, data) => {
  return res.status(status).json({ status: statusMessage, data });
};

const responseError = (res, status, statusMessage) => {
  return res.status(status).json({ status: statusMessage });
};

module.exports = { responseSuccess, responseError };
