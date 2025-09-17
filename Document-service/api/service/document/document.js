const { uploadFile, deleteFile, getFileLink } = require("../../helper/s3");
const document = require("../../model/document/document");
const dal = require("../../helper/dal");

exports.uploaddoc = async (file, userId) => {
  if (!file) {
    return {
      message: "No file uploaded",
      status: 400,
    };
  }
  const s3Result = await uploadFile(file);

  const doc = await dal.create(document, {
    fileName: file.originalname,
    s3Key: s3Result.Key,
    createdBy: userId,
  });

  return {
    message: "File uploaded successfully",
    data: {
      docId: doc._id,
      fileName: doc.fileName,
      createdAt: doc.createdAt,
    },
    status: 200,
  };
};

exports.updatedoc = async (docId, data) => {
  console.log("🚀 ~ data:", data);
  const doc = await dal.findByID(document, docId);
  if (!doc) {
    return {
      message: "Document not found",
      status: 400,
    };
  }

  const uodatedoc = await dal.findOneAndUpdate(document, { _id: docId }, data, {
    new: true,
  });
  console.log("🚀 ~ uodatedoc:", uodatedoc);

  return {
    data: uodatedoc,
    message: "Document updated successfully",
    status: 200,
  };
};

exports.deletedoc = async (docId) => {
  const doc = await dal.findByID(document, docId);
  if (!doc) {
    return {
      message: "Document not found",
      status: 400,
    };
  }

  await deleteFile(doc.s3Key);

  await dal.findOneAndDelete(document, { _id: docId });
  return {
    message: "Document deleted successfully",
    status: 200,
  };
};

exports.getdoc = async (docId) => {
  const doc = await dal.findByID(document, docId);
  if (!doc) {
    return {
      message: "Document not found",
      status: 400,
    };
  }
  const link = getFileLink(doc.s3Key);

  return {
    message: "Document found",
    data: {
      docId: doc._id,
      fileName: doc.fileName,
      createdAt: doc.createdAt,
      link,
    },
    status: 200,
  };
};
