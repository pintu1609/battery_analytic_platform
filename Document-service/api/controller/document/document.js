const { useErrorHandler } = require("../../middleware/error-handler");
const {
  clientHandler,
  responseHandler,
} = require("../../middleware/response-handler");
const service = require("../../service/document/document");
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return clientHandler({}, res, "No file uploaded", 400);
    const userId = req.user.id;
    const s3Result = await service.uploaddoc(req.file, userId);
    if (s3Result.status !== 200)
      return clientHandler({}, res, s3Result.message, s3Result.status);
    return responseHandler(s3Result.data, res, s3Result.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res);
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const doc = await service.updatedoc(req.params.docId, req.body);
    if (doc.status !== 200)
      return clientHandler({}, res, doc.message, doc.status);
    return responseHandler(doc.data, res, doc.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res);
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const doc = await service.deletedoc(req.params.docId);
    if (doc.status !== 200)
      return clientHandler({}, res, doc.message, doc.status);
    return responseHandler(doc.data, res, doc.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res);
  }
};

exports.getDocumentLink = async (req, res) => {
  try {
    const doc = await service.getdoc(req.params.docId);
    if (doc.status !== 200)
      return clientHandler({}, res, doc.message, doc.status);
    return responseHandler(doc.data, res, doc.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res);
  }
};
