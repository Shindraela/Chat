/*
Imports
*/
// Node
const express = require("express");
const authRouter = express.Router();

// Outter
const apiUrl = "http://localhost:5600/messages";

// Inner
const {
    register,
    login,
    createMessage,
    updateMessage,
    deleteMessage
} = require("./auth.controller");
const { checkFields } = require("../../services/request.checker");
const {
    sendBodyError,
    sendFieldsError,
    sendApiSuccessResponse,
    sendApiErrorResponse
} = require("../../services/server.response");
//

/*
Routes definition
*/
class AuthRouterClass {
    routes() {
        // HATEOAS
        authRouter.get("/", (req, res) => {
            res.json("HATEOAS for auth");
        });

        // Register
        authRouter.post("/register", (req, res) => {
            // Use controller function
            register(req.body)
                .then(apiResponse => res.json(apiResponse))
                .catch(apiResponse => res.json(apiResponse));
        });

        // Login
        authRouter.post("/login", (req, res) => {
            // Use controller function
            login(req.body)
                .then(apiResponse => res.json(apiResponse))
                .catch(apiResponse => res.json(apiResponse));
        });

        // Add Message
        authRouter.post("/message", (req, res) => {
            // Check for body data
            if (typeof req.body === "undefined" || req.body === null)
                sendBodyError(res, "No body data provided");

            // Check for mandatories
            const { miss, extra, ok } = checkFields(
                ["content", "user"],
                req.body
            );

            // Check oppropriated values
            if (!ok) {
                sendFieldsError(res, "Bad fields provided", miss, extra);
            }

            // Use controller function
            createMessage(req.body)
                .then(apiRes =>
                    sendApiSuccessResponse(res, "Message received", apiRes)
                )
                .catch(apiErr =>
                    sendApiErrorResponse(res, "Message not received", apiErr)
                );
        });

        // Update Message
        authRouter.put("/message/:id", (req, res) => {
            // Check for route param
            if (!req.params || !req.params.id) {
                sendBodyError(res, "No param provided");
            }

            // Check for body data
            if (typeof req.body === "undefined" || req.body === null)
                sendBodyError(res, "No body data provided");

            // Check for mandatories
            const { miss, extra, ok } = checkFields(
                ["content", "user"],
                req.body
            );

            // Check oppropriated values
            if (!ok) {
                sendFieldsError(res, "Bad fields provided", miss, extra);
            }

            // Display todo
            updateMessage(apiUrl, req.params.id)
                .then(apiRes =>
                    sendApiSuccessResponse(res, "Message updated", apiRes)
                )
                .catch(apiErr =>
                    sendApiErrorResponse(res, "Message not updated", apiErr)
                );
        });

        // Delete Message
        authRouter.delete("/message/:id", (req, res) => {
            // Check for route param
            if (!req.params || !req.params.id) {
                sendBodyError(res, "No param provided");
            }

            // Use controller function
            deleteMessage(apiUrl, req.params.id)
                .then(apiRes =>
                    sendApiSuccessResponse(res, "Message received", apiRes)
                )
                .catch(apiErr =>
                    sendApiErrorResponse(res, "Message not received", apiErr)
                );
        });
    }

    init() {
        this.routes();
        return authRouter;
    }
}
//

/*
Export
*/
module.exports = AuthRouterClass;
//
