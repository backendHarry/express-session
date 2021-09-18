const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config({ path: "config.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "osagiedeharrison27",
    pass: process.env.EMAIL_PASS,
  },
});
const EmailHandler = (to, subject, text) => {
  let options = {
    from: "osagiedeharrison58@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };
  return transporter.sendMail(options, (err, info) => {
    if (err) console.log(err);
    else {
      console.log("Email sent, kindly check email");
    }
  });
};

module.exports = EmailHandler;
