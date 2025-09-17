const service = require("../../service/auth/register");
const {
  responseHandler,
  clientHandler,
} = require("../../middleware/response-handler");
const { useErrorHandler } = require("../../middleware/error-handler");
exports.register = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await service.registerUser(body);
    if (user.status === 400) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    useErrorHandler(err, req, 500, next);
    console.error(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await service.loginUser(body);
    if (user.status === 400) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    useErrorHandler(err, req, 500, next);
    next(err);
  }
};
