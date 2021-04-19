const mongoose = require('mongoose')
const User = require('./user');

const MessageSchema = mongoose.Schema({
    user:{
        id:String,
        nickname:String,
    },
    content: String,
    createdAt:Date,
});

module.exports = mongoose.model("Message", MessageSchema);