const { Router } = require("express");

const loginRouter = Router();

const { signUp, signIn } = require("../handlers/loginHandlers");

// endpoints for the login routes
loginRouter.post("/signUp", signUp);
loginRouter.post("/signin", signIn);

module.exports = loginRouter;
