const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
       },
       password: {
        type: String,
        required: true
       },
       email: {
        type: String,
         required: true,
         unique: true
       },
       fullName: {
        type: String,
        required: true
       },
});

schema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
});
  
module.exports = mongoose.model("User", schema);