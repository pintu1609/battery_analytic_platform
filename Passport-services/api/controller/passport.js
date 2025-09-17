const service = require('../service/passport');
const { responseHandler, clientHandler } = require('../middleware/response-handler');
const {useErrorHandler} = require("../middleware/error-handler");

exports.createPassport = async (req, res) => {
  try {
    const result = await service.createPassport(req.body);
    responseHandler(result.data, res, result.message, result.status);
  } catch (err) {
    useErrorHandler(err, req, res);
  }
};

exports.getPassport = async (req, res) => {
  try {
    const result = await service.getPassportById(req.params.id);
    if (result.status !== 200) return clientHandler({}, res, result.message, result.status);
    responseHandler(result.data, res, 'Passport fetched', 200);
  } catch (err) {
    useErrorHandler(err, req, res);
  }
};

exports.updatePassport = async (req, res) => {
  try {
    const result = await service.updatePassport(req.params.id, req.body);
        if (result.status !== 200) return clientHandler({}, res, result.message, result.status);

    responseHandler(result.data, res, result.message, 200);
  } catch (err) {
    useErrorHandler(err, req, res);
  }
};

exports.deletePassport = async (req, res) => {
  try {
    const result = await service.deletePassport(req.params.id);
    responseHandler({}, res, result.message, 200);
  } catch (err) {
    useErrorHandler(err, req, res);
  }
};