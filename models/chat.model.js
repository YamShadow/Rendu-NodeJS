/*
Imports & configs
*/
const mongoose = require("mongoose");
const { Schema } = mongoose;

/*
Model definition
*/
const chatSchema = new Schema({
  message: String,
  date: Date,
  idUser: String
});

/*
Method
*/

/*
Export
*/
const ChatModel = mongoose.model("messages", chatSchema);
module.exports = ChatModel;
