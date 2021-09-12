const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "oops, sorry username is already taken"],
  },
  email: { type: String, unique: [true, "This email already exists"] },
  password: { type: String },
  verified: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
  token: { type: String },
});

// userSchema.methods.hasExpired = () => {
//   const
// }

module.exports = model("user", userSchema);
