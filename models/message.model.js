/*
Imports & configs
*/
const mongoose = require("mongoose");
const { Schema } = mongoose;
//

/*
Model definition
*/
const messageSchema = new Schema({
    name: String,
    message: String
});
//

/*
Export
*/
const MessageModel = mongoose.model("message", messageSchema);
module.exports = MessageModel;
//
