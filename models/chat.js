const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    text: String,
    user: String,
    readReceipt: Boolean,
    date: Date
});

const Chat = mongoose.model('Chat', chatSchema);


module.exports = Chat;