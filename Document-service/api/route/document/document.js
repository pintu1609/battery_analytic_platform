const router = require("express").Router();
const {uploadDocument, getDocumentLink, updateDocument, deleteDocument} = require("../../controller/document/document");

const  upload  = require("../../middleware/upload");
const { verifyToken, authorizeRole } = require('../../middleware/authorization');
const validatedocument = require('../../validation/document/document');
const validation = require('../../middleware/validate');


router.post('/', verifyToken, authorizeRole('admin'), upload.single('file'), uploadDocument);
router.get('/:docId', verifyToken, authorizeRole('admin'), getDocumentLink);
router.put('/:docId', verifyToken, authorizeRole('admin'),validation(validatedocument.documentSchema), updateDocument);
router.delete('/:docId', verifyToken, authorizeRole('admin'), deleteDocument);

  module.exports = router;
