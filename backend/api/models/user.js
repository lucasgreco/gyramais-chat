const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    nickname:String,
    chatRoom:{
        id:String,
        name:String,
    }
});

module.exports = mongoose.model("User", UserSchema);