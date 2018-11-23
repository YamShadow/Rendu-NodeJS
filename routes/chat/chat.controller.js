/*
Import
*/
const UserModel = require("../../models/user.model");
const ChatModel = require("../../models/chat.model");
const bcrypt = require("bcryptjs");

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
    UserModel.findOne({ email: body.email }, (error, user) => {
      if (error) reject(error);
      else if (!user) reject("User not found");
      else {
        // Check password
        const validPassword = bcrypt.compareSync(body.password, user.password);

        if (!validPassword) reject("Password not valid");
        else
          resolve({
            user: user,
            token: user.generateJwt()
          });
      }
    });
  });
};
//

/*
Export
*/
module.exports = {
  getMessage,
  postMessage
};
