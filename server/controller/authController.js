const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../model/user-model"); //User model for DB
const {
  registerValidation,
  passwordChecker,
  uniqueUsernameVal,
} = require("../service/registerValidation");
const passport = require("../service/passport");

const homeController = (req, res) => {
  res.json({ message: "hello user welcome to the home route" });
};

const registerController = async (req, res, next) => {
  let data; //to make available for bth try and catch blocks
  try {
    const { errors, value } = registerValidation(req.body); //gets the custom errors or clean data val from the regVal... function
    if (errors) return res.status(400).json({ errors }); //stops execution and return errors
    data = { ...value }; //spreading over the clean data to data
    //// Passsword Strength checker
    let passwordRes = passwordChecker(data.password);
    if (passwordRes.errors) return res.status(400).json({ passwordRes });
    //// ---- end password strenght checker
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(value.password, salt); // Hash Password
    //-------- Send an email to verify user
    // Token
    const token = crypto.randomBytes(32).toString("hex");
    data.token = token;
    // Create user
    const userCreated = await User.create(data);
    res.status(201).json({ userCreated });
    // end create user
    // Email sent
    console.log(
      `127.0.0.1:5000/api/V1/auth/verify-account?user_id=${userCreated._id}&token=${token}`
    );
    // end token
    // -------End email logic
  } catch (err) {
    const errorMsg = uniqueUsernameVal(err, data);
    if (err.code == 11000) return res.status(400).json(errorMsg);
    console.log(err);
    next(err);
  }
};

const verifyAccountEmailController = async (req, res, next) => {
  try {
    const uid = req.query.user_id;
    const token = req.query.token;
    const timeUserClicks = Date.now(); //Time user clicks on the link to be redirected here
    let user = await User.findOne({ token: token });
    if (user) {
      if (await user.hasExpired(timeUserClicks, user)) {
        //sending this to client, at same time we are sending email for user to click on
        return res.status(400).json({
          message:
            "token expired Confirmation Token has expired, please request from new route",
          route: `127.0.0.1:5000/api/V1/auth/resend-token?uid=${uid}`,
        });
      } else {
        user.verifyEmail = true;
        user.active = true;
        user.token = undefined;
        user.tokenCreatedDate = undefined;
        await user.save();
        return res.json({ success: { message: "Email has been verified" } });
      }
    } else {
      return res.status(400).json({
        message:
          "no user Confirmation Token has expired, please request from new route",
        route: `127.0.0.1:5000/api/V1/auth/resend-token?uid=${uid}`,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const resendTokenController = async (req, res) => {
  // generate new token and send again;
  //request is coming from a mail, so after this we redirect to the activate email to activate email for user
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const uid = req.query.uid;
    const user = await User.findOne({ _id: uid });
    user.token = token;
    await user.save();
    res.redirect(`verify-account?user_id=${uid}&token=${token}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const loginController = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) console.log(err);
      if (!user) return res.status(401).json({ info });
      res.send("login successful");
    })(req, res, next);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  homeController,
  registerController,
  verifyAccountEmailController,
  resendTokenController,
  loginController,
};
