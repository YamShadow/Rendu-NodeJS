/*
Import
*/
const UserModel = require("../../models/user.model");
const ChatModel = require("../../models/chat.model");

/*
Functions
*/
const getMessage = body => {
  return new Promise((resolve, reject) => {
    ChatModel.find((error, messages) => {
      if (error) reject(error);
      else if (!messages) reject("messages not found");
      else {
        resolve({
          messages: messages
        });
      }
    });
  });
};

const postMessage = body => {
  return new Promise((resolve, reject) => {
    const user = new UserModel().getJwt(body.token);

    const data = {
      message: body.message,
      date: new Date(),
      idUser: user._id
    };

    ChatModel.create(data, (error, newMessage) => {
      if (error) {
        // Mongo error
        return reject(error);
      } else {
        // Message saved
        return resolve(newMessage);
      }
    });
  });
};

const deleteMessage = body => {
  return new Promise((resolve, reject) => {
    const user = new UserModel().getJwt(body.token);

    console.log(user);
    console.log(body);

    ChatModel.deleteOne(
      { _id: body.id, idUser: user._id },
      (error, deleteMessage) => {
        if (error) {
          // Mongo error
          return reject(error);
        } else {
          // Message deleted
          return resolve(deleteMessage);
        }
      }
    );
  });
};

//

/*
Export
*/
module.exports = {
  getMessage,
  postMessage,
  deleteMessage
};
