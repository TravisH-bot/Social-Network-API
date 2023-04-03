const { Schema, model } = require("mongoose");

//Schema to create user model
const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, `Please provide a valid email address`],
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      `Please provide a valid email address`,
    ],
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

//Virtual property 'friendCount' that gets the length of the use's friends array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//Initialize the User model
const User = model("user", userSchema);

module.exports = User;
