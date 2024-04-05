const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfileSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username."],
    minlenght: 3,
    maxlenght: 40,
  },
  email: {
    type: String,
    required: [true, "Please provide email."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid e-mail address.",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
    minlenght: 8,
  },
  name: {
    type: String,
    required: [true, "Please provide name."],
  },
  agegroup: {
    type: String,
    enum: ["18 - 30", "31 - 40", "41 - 50", "51 - 60", "61 - 70", "71 - 80"],
    required: [true, "Please provide age group."],
  },
  email: {
    type: String,
    ref: "UserLogon",
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number."],
    unique: true,
    match: [/^[0-9]+$/, "Please provide valid phone number."],
    minlenght: 10,
    maxlenght: 10,
  },
  address: {
    type: String,
    required: [true, "Please provide address."],
  },
});

UserProfileSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserProfileSchema.methods.getName = function () {
  return this.name;
};

UserProfileSchema.methods.createJWT = async function () {
  let tok = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return tok;
};
UserProfileSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("UserProfile", UserProfileSchema);
