const { clientHandler } = require("../middleware/response-handler");

const { Resend } = require("resend");

const resend = new Resend(process.env.API_KEY);
exports.sendEmail = async ({ receverEmail, subject, desc }) => {
  if (!process.env.EMAIL_USER) {
    return clientHandler({
      message: "Email receiver or user not defined in environment variables.",
      status: 400,
    });
  }

  const messageData = {
    from: process.env.EMAIL_USER,
    to: receverEmail,
    subject: subject,
    text: desc,
  };

  try {
    const response = await resend.emails.send(messageData);
    return { status: 200, message: "Email sent successfully", data: response };
  } catch (error) {
    console.log("🚀 ~ exports.sendEmail= ~ error:", error);
    throw new Error("Failed to send email");
  }
};
