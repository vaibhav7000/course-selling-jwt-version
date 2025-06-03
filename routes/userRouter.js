const express = require("express");
const router = express.Router();
const  { userInputValidationSignUp, checkUserNameExistInDatabase, userInputValidationSignIn, checkUserExistInDatabase } = require("../middlewares/user.js");
const { addUserToDatabase, provideJWT } = require("../controllers/userController.js");


// signup route-handler for user
router.post("/signup", userInputValidationSignUp, checkUserNameExistInDatabase, addUserToDatabase)

// singin route-handler -> whose controller will return jwt that includes username and id (object)
router.post("/signin", userInputValidationSignIn, checkUserExistInDatabase, provideJWT);

module.exports = router;