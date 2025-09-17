// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// module.exports = upload;


const multer = require('multer');

// Memory storage for S3 uploads
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;