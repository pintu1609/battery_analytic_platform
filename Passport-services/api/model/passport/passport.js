const mongoose = require('mongoose');

const passportSchema = new mongoose.Schema({
    data: { type: Object, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BatteryPassport', passportSchema);