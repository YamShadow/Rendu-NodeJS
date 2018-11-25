/*
Imports
*/
const express = require("express");
const authRouter = express.Router({ mergeParams: true });
const { register, login } = require("./auth.controller");
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
class AuthRouterClass {
  routes() {
    // HATEOAS
    authRouter.get("/", (req, res) => {
      const routes = {
        Route: {
          "/": "Liste des routes disponibles",
          register: "Inscription de l'utilisateur",
          login: "Connexion de l'utilisateur"
        }
      };
      res.json(routes);
    });

    // Register
    authRouter.post("/register", (req, res) => {
      // Check for body data
      if (typeof req.body === "undefined" || req.body === null)
        sendBodyError(res, "No body data provided");

      // Check for mandatories
      const { miss, extra, ok } = checkFields(
        ["first_name", "last_name", "email", "password"],
        req.body
      );

      // Check oppropriated values
      if (!ok) {
        sendFieldsError(res, "Bad fields provided", miss, extra);
      }

      // Use controller function
      register(req.body)
        .then(apiResponse =>
          sendApiSuccessResponse(res, "Register ok", apiResponse)
        )
        .catch(apiErr => sendApiErrorResponse(res, "Register not ok", apiErr));
    });

    // Login
    authRouter.post("/login", (req, res) => {
      // Check for body data
      if (typeof req.body === "undefined" || req.body === null)
        sendBodyError(res, "No body data provided");

      // Check for mandatories
      const { miss, extra, ok } = checkFields(["email", "password"], req.body);

      // Check oppropriated values
      if (!ok) {
        sendFieldsError(res, "Bad fields provided", miss, extra);
      }
      // Use controller function
      login(req.body)
        .then(apiResponse =>
          sendApiSuccessResponse(res, "login ok", apiResponse)
        )
        .catch(apiErr => sendApiErrorResponse(res, "login not ok", apiErr));
    });
  }

  init() {
    this.routes();
    return authRouter;
  }
}

/*
Export
*/
module.exports = AuthRouterClass;
