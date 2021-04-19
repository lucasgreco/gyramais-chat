const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    nickname:String,
});

module.exports = mongoose.model("User", UserSchema);