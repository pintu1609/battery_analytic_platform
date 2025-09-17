const joi = require("joi");

const documentSchema = joi.object({
    fileName: joi.string().required(),
   
});

module.exports = {documentSchema};