const bcrypt = require("bcrypt");
const crypto = require("crypto");
const passport = require("../service/passport");
const User = require("../model/user-model"); //User model for DB
const {
  registerValidation,
  passwordChecker,
  uniqueUsernameVal,
  passwordResetValidator,
} = require("../service/registerValidation");
const EmailHandler = require("../service/email");

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
    data.secretQuestion.answer = await bcrypt.hash(
      value.secretQuestion.answer,
      salt
    ); //hashes the answer used to reset password
    //-------- Send an email to verify user
    // Token
    const token = crypto.randomBytes(32).toString("hex");
    data.token = token;
    // Create user
    const userCreated = await User.create(data);
    res.status(201).json({ userCreated });
    // end create user
    // Email sent
    const to = data.email;
    const subject = "Verify Email Account";
    const text = `Hello ${data.username}, please click on the link to verify your email\n http://127.0.0.1:5000/api/V1/auth/verify-account?user_id=${userCreated._id}&token=${token}
    `;
    EmailHandler(to, subject, text);
    // console.log(
    //   `127.0.0.1:5000/api/V1/auth/verify-account?user_id=${userCreated._id}&token=${token}`
    // );
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
        const to = user.email;
        const subject = "Email Verification Link expired";
        const text = `token expired Confirmation Token has expired, please request from new route.\n http://127.0.0.1:5000/api/V1/auth/resend-token?uid=${uid}`;
        EmailHandler(to, subject, text);
        res.json({ message: "Email sent, please click to resend a new link" });
        // return res.status(400).json({
        //   message:
        //     "token expired Confirmation Token has expired, please request from new route",
        //   route: `127.0.0.1:5000/api/V1/auth/resend-token?uid=${uid}`,
        // });
        return res;
      } else {
        user.verifyEmail = true;
        user.active = true;
        user.token = undefined;
        user.tokenCreatedDate = undefined;
        await user.save();
        return res.json({ success: { message: "Email has been verified" } });
      }
    } else {
      // return res.status(400).json({
      //   message:
      //     "no user Confirmation Token has expired, please request from new route",
      //   route: `127.0.0.1:5000/api/V1/auth/resend-token?uid=${uid}`,
      // });
      const to = user.email;
      const subject = "Email Verification Link expired";
      const text = `token expired Confirmation Token has expired, please request from new route. http://127.0.0.1:5000/api/V1/auth/resend-token?uid=${uid}`;
      EmailHandler(to, subject, text);
      res.json({ message: "Email sent, please click to resend a new link" });
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
    const to = user.email;
    const subject = "Verify Email Account";
    const text = `Hello ${data.username}, please click on the link to verify your email. http://127.0.0.1:5000/api/V1/auth/verify-account?user_id=${uid}&token=${token}`;
    Email(to, subject, text);
    res.json({ message: "Email sent, please click on link to verify email" });
    // res.redirect(`verify-account?user_id=${uid}&token=${token}`);
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
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
      });
      res.json({ message: "logged in success" });
    })(req, res, next);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const logoutController = (req, res) => {
  try {
    req.logout();
    res.status(200).json({ message: "logged out success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const forgetPasswordController = async (req, res) => {
  try {
    /* If user forgets password, i would want users to answer a secret question only they know the answer to
    1) identify the user by asking for either username or email,
    2) ask the user the question, he/she Created
    3) if the answer is correct, create a token and send that token to the email
    4) if user verifies token, he/she will be prompted to create a new password
    */
    const { email_username } = req.body;
    const user = await User.findOne({
      $or: [{ username: email_username }, { email: email_username }],
    });
    if (user) {
      if (!user.active)
        return res
          .status(400)
          .redirect(`verify-account?user_id=${user._id}&token=${user.token}`);
      res.redirect(`confirm-question?username_email=${user.id}`); //next step, No 2.
    } else {
      res.json({
        message: "Could not find an account that matches your credentials",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const confirmQuestionGetController = async (req, res) => {
  // No 2. for the get Route when we get the question
  try {
    const { username_email } = req.query;
    console.log(username_email);
    if (!username_email) res.redirect("forget-password");
    else {
      const user = await User.findById(username_email);
      if (user) {
        if (!user.active) {
          return res
            .status(400)
            .redirect(`verify-account?user_id=${user._id}&token=${user.token}`);
        }
        return res.json({ question: user.secretQuestion.question });
      } else {
        res.redirect("forget-password");
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const confirmQuestionPostController = async (req, res, next) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const id = req.query.username_email;
    const answer = req.body.answer.toLowerCase();
    const user = await User.findById(id);
    if (!answer) {
      return res.status(400).json({
        errors: { answer: "please include an answer for the question" },
      });
    }
    const isValid = await bcrypt.compare(answer, user.secretQuestion.answer);
    if (!isValid) {
      return res.json({ message: "wrong" });
    } else {
      user.token = token;
      await user.save();
      const to = user.email;
      const subject = "Reset password";
      const text = `Hello ${user.username}, Please click on click to change password. http://127.0.0.1:5000/api/v1/auth/change-password?token=${token}`;
      EmailHandler(to, subject, text);
      console.log("email sent for user to click on and change password");
      // console.log(
      //   `Email sent: 127.0.0.1:5000/api/v1/auth/change-password?token=${token}`
      // );
      return res.json({ message: "confirmed" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updatePasswordEmailController = async (req, res) => {
  const token = req.query.token;
  let timeUserClicks = Date.now();
  const user = await User.findOne({ token: token });
  if (user) {
    if (await user.hasExpired(timeUserClicks, user)) {
      //sending this to client, at same time we are sending email for user to click on
      // return res.status(400).json({
      //   message:
      //     "token expired Confirmation Token has expired, please request from new route",
      //   route: `127.0.0.1:5000/api/V1/auth/confirm-question?username_email=${user.username}`,
      // });
      const to = user.email;
      const subject = "Email Verification Link expired";
      const text = `token expired Confirmation Token has expired, please request from new route. http://127.0.0.1:5000/api/V1/auth/resend-token?uid=${uid}`;
      EmailHandler(to, subject, text);
      res.json({ message: "Email sent, please click to resend a new link" });
    } else {
      const { errors, value } = passwordResetValidator(req.body);
      if (errors) return res.status(400).json({ errors }); //Check for JOI Errors
      let passwordRes = passwordChecker(value.password);
      if (passwordRes.errors) return res.status(400).json({ passwordRes }); //Check for password Strength
      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(value.password, salt);
      const updateUser = await User.findByIdAndUpdate(
        user.id,
        {
          $set: {
            password: hashedPwd,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        message: "password has been resetted, you can now login!",
        user: updateUser,
      });
    }
  } else {
    return res.status(400).json({
      message:
        "token expired Confirmation Token has expired, please request from new route",
      route: `127.0.0.1:5000/api/V1/auth/confirm-question${user.username}`,
    });
  }
};

module.exports = {
  homeController,
  registerController,
  verifyAccountEmailController,
  resendTokenController,
  loginController,
  logoutController,
  forgetPasswordController,
  confirmQuestionGetController,
  confirmQuestionPostController,
  updatePasswordEmailController,
};
