const express = require("express");
const router = express.Router();
const  { userInputValidationSignUp, checkUserNameExistInDatabase } = require("../middlewares/user.js");
const { addUserToDatabase } = require("../controllers/userController.js");


// signin route-handler for user
router.post("/signup", userInputValidationSignUp, checkUserNameExistInDatabase, addUserToDatabase)

module.exports = router;