const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Register", registerSchema);
