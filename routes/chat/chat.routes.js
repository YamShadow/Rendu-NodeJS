/*
Imports
*/
const express = require("express");
const chatRouter = express.Router({ mergeParams: true });
const { getMessage, postMessage, login } = require("./chat.controller");
const { checkFields } = require("../../services/request.checker");
const {
  sendBodyError,
  sendFieldsError,
  sendApiSuccessResponse,
  sendApiErrorResponse
} = require("../../services/server.response");

/*
Routes definition
*/
class ChatRouterClass {
  routes() {
    // HATEOAS
    chatRouter.get("/", (req, res) => {
      res.json("HATEOAS for chat");
    });

    // Messages
    chatRouter.get("/message", (req, res) => {
      // Use controller function
      getMessage(req.body)
        .then(apiResponse =>
          sendApiSuccessResponse(res, "Messages ok", apiResponse)
        )
        .catch(apiErr => sendApiErrorResponse(res, "Messages not ok", apiErr));
    });

    chatRouter.post("/message", (req, res) => {
      // Check for body data
      if (typeof req.body === "undefined" || req.body === null)
        sendBodyError(res, "No body data provided");

      // Check for mandatories
      const { miss, extra, ok } = checkFields(["message", "token"], req.body);

      // Check oppropriated values
      if (!ok) {
        sendFieldsError(res, "Bad fields provided", miss, extra);
      }

      // Use controller function
      postMessage(req.body)
        .then(apiResponse =>
          sendApiSuccessResponse(res, "Messages post", apiResponse)
        )
        .catch(apiErr =>
          sendApiErrorResponse(res, "Messages not post", apiErr)
        );
    });

    chatRouter.delete("/message", (req, res) => {
      // Check for body data
      if (typeof req.body === "undefined" || req.body === null)
        sendBodyError(res, "No body data provided");

      // Check for mandatories
      const { miss, extra, ok } = checkFields(["id", "token"], req.body);

      // Check oppropriated values
      if (!ok) {
        sendFieldsError(res, "Bad fields provided", miss, extra);
      }

      // Use controller function
      deleteMessage(req.body)
        .then(apiResponse =>
          sendApiSuccessResponse(res, "Messages delete", apiResponse)
        )
        .catch(apiErr =>
          sendApiErrorResponse(res, "Messages not delete", apiErr)
        );
    });
  }

  init() {
    this.routes();
    return chatRouter;
  }
}

/*
Export
*/
module.exports = ChatRouterClass;
