/*
Imports
*/
// NodeJS
const { Router } = require("express");

// Inner
const AuthRouterClass = require("./auth/auth.routes");
const ChatRouterClass = require("./chat/chat.routes");
const { checkFields } = require("../services/request.checker");
const {
  sendBodyError,
  sendFieldsError,
  sendApiSuccessResponse,
  sendApiErrorResponse
} = require("../services/server.response");

/*
Define routers
*/
// Parent
const mainRouter = Router({ mergeParams: true });
const apiRouter = Router({ mergeParams: true });

// Child
const authRouter = new AuthRouterClass();
const chatRouter = new ChatRouterClass();

/*
Define routes
*/
mainRouter.use("/api", apiRouter);
apiRouter.use("/auth", authRouter.init());
apiRouter.use("/chat", chatRouter.init());

/*
Export
*/
module.exports = { mainRouter };
