const mongoose = require('mongoose')
const User = require('./user');

const MessageSchema = mongoose.Schema({
    user:User.schema,
    content: String,
    createdAt:Date,
});

module.exports = mongoose.model("Message", MessageSchema);