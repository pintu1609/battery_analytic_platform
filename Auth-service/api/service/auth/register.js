const registerModel = require("../../model/auth/register");
const dal = require("../../helper/dal");
const bcrypt = require("bcryptjs");

const { getAccessToken } = require("../../helper/helper"); // Adjust path

exports.registerUser = async (body) => {
  const existingUser = await dal.findOne(registerModel, { email: body.email });
  if (existingUser) {
    return {
      message: "Email already exists",
      status: 400,
    };
  }
  const password = await bcrypt.hash(body.password, 10);
  body.password = password;
  const user = await dal.create(registerModel, body);
  return {
    message: "User registered successfully",
    status: 200,
    data: user,
  };
};

exports.loginUser = async (body) => {
  const user = await dal.findOne(registerModel, { email: body.email });
  if (!user) {
    return {
      message: "User not found",
      status: 400,
    };
  }
  const isPasswordMatch = await bcrypt.compare(body.password, user.password);
  if (!isPasswordMatch) {
    return {
      message: "Invalid password",
      status: 400,
    };
  }

  const token = getAccessToken({ id: user._id, role: user.role });

  return {
    message: "User logged in successfully",
    status: 200,
    data: {
      user,
      token,
    },
  };
};
