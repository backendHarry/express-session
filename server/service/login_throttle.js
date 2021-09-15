const limitter = require("express-rate-limit");

// assuming this is email logic

let emailSent = () => console.log("email sent");
let sendEmailBool = true;

const loginLimitter = limitter({
  windowMs: 60 * 2000, //Makes it work for 2mins
  max: 3,
  handler: (req, res, next) => {
    return res.status(429).json({ message: "Sorry please try again in 2mins" });
  },
  onLimitReached: () => {
    if (sendEmailBool) {
      sendEmailBool = false;
      return emailSent();
    }
  },
});

module.exports = loginLimitter;
