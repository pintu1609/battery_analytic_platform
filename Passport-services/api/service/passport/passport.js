const passportModel = require("../../model/passport/passport");
const dal = require("../../helper/dal");
const { sendMessage } = require("../../helper/kaftaHelper");
const e = require("express");

exports.createPassport = async (data, email) => {
  const passport = await dal.create(passportModel, data);
  sendMessage("passport.created", "Passport created", email);

  return {
    status: 200,
    message: "Passport created successfully",
    data: passport,
  };
};

exports.getPassportById = async (id) => {
  const passport = await dal.findByID(passportModel, id);
  if (!passport) return { status: 404, message: "Passport not found" };
  return { status: 200, data: passport };
};

exports.updatePassport = async (id, data, email) => {
  const fingpassport = await dal.findByID(passportModel, id);
  if (!fingpassport) return { status: 404, message: "Passport not found" };
  const passport = await dal.findOneAndUpdate(passportModel, { _id: id }, data);
  sendMessage("passport.updated", "Passport updated", email);
  return { status: 200, message: "Passport updated", data: passport };
};

exports.deletePassport = async (id, email) => {
  const passport = await dal.findOneAndDelete(passportModel, { _id: id });
  sendMessage("passport.deleted", "Passport deleted", email);
  return { status: 200, message: "Passport deleted" };
};
