// const fs = require("fs");
// const path = require("path");

// // Simple mock email sender (writes to console + file)
// exports.sendEmail = async (to, subject, body) => {
//   const logMessage = `To: ${to}\nSubject: ${subject}\nBody: ${body}\n\n`;
//   console.log("📧 Email Sent:\n", logMessage);

//   const filePath = path.join(__dirname, "../../emails.log");
//   fs.appendFileSync(filePath, logMessage);
// };

const {clientHandler} = require("../middleware/response-handler");


// import { Resend } from "resend";
const { Resend } = require("resend");


const resend = new Resend(process.env.API_KEY); // Ensure it's treated as a string
;

exports.sendEmail=async ({receverEmail, subject, desc }) =>{ 
    
    // const email = process.env.EMAIL_RECEVIER; // Correct the variable name if necessary

    if ( !process.env.EMAIL_USER) {
        // throw new Error('Email receiver or user not defined in environment variables.');
        return clientHandler({
            message: "Email receiver or user not defined in environment variables.",
            status: 400,
        });
    }

    const messageData = {
        from: process.env.EMAIL_USER,
        // to: email,
        to: receverEmail,
        subject: subject,
        text: desc,
    };

    try {
        const response = await resend.emails.send(messageData);
        return {status: 200, message: "Email sent successfully", data: response };
        // console.log("Email sent successfully:", response);
    } catch (error) {
        console.log("🚀 ~ exports.sendEmail= ~ error:", error);
        throw new Error('Failed to send email');
    }
}
