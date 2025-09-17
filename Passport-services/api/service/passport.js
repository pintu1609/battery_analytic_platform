const passportModel = require("../model/passport");
const dal = require("../helper/dal");
const { sendMessage } = require('../helper/kaftaHelper');


exports.createPassport = async (data) => {
    const passport = await dal.create(passportModel, data);
      sendMessage('passport.created', passport);

  return {
    status: 200,
    message: 'Passport created successfully',
    data: passport
  };
};

exports.getPassportById = async (id) => {
  const passport = await dal.findByID(passportModel, id);
  if (!passport) return { status: 404, message: 'Passport not found' };
  return { status: 200, data: passport };
};

exports.updatePassport = async (id, data) => {
      const fingpassport = await dal.findByID(passportModel, id);
  if (!fingpassport) return { status: 404, message: 'Passport not found' };
  const passport = await dal.findOneAndUpdate(passportModel, {_id: id}, data);
  sendMessage('passport.updated', passport);
  return { status: 200, message: 'Passport updated', data: passport };
};

exports.deletePassport = async (id) => {
  const passport = await dal.findOneAndDelete(passportModel, id);
  sendMessage('passport.deleted', { id });
  return { status: 200, message: 'Passport deleted' };
};