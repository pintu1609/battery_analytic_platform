const {mongoose} = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  fileName: { type: String, required: true },
  s3Key: { type: String, required: true },
  createdBy: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);