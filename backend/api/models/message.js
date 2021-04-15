const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    user:String,
    content: String,
    createdAt:Date,
    chatRoom:{
        id:String,
        name:String,
    }
});

module.exports = mongoose.model("Message", MessageSchema);