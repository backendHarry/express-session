const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user-model");

const authHandler = async (username, password, cb) => {
  try {
    let user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    }); //for both username or email login
    if (!user)
      return cb(null, false, {
        errors: { username: "username or email incorrect" },
      });
    let isMatchedPasswords = await bcrypt.compare(password, user.password);
    if (!isMatchedPasswords)
      return cb(null, false, {
        errors: { password: "please enter correct credentials" },
      });
    if (!user.verifyEmail)
      return cb(null, false, {
        non_field_errors: {
          message:
            "please, verify your email by clicking on the link sent to it",
        },
      });
    return cb(null, user);
  } catch (err) {
    console.log(err);
  }
};

passport.use(new LocalStrategy(authHandler));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});

module.exports = passport;
