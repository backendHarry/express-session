const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "oops, sorry username is already taken"],
  },
  email: { type: String, unique: [true, "This email already exists"] },
  password: { type: String },
  verifyEmail: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
  token: { type: String },
  tokenCreatedDate: { type: Date, default: Date.now() },
});

userSchema.methods.hasExpired = async (time, user) => {
  const timeWhenTokenCreated = Date.parse(user.tokenCreatedDate);
  const limit = 60 * 2000; //limit should be 2mins
  const difference = time - timeWhenTokenCreated;
  if (difference > limit) {
    user.token = undefined;
    user.tokenCreatedDate = undefined;
    await user.save();
    return true;
  } else {
    return false;
  }
  // return true;
};

module.exports = model("user", userSchema);
