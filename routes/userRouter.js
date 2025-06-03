const express = require("express");
const router = express.Router();
const  { userInputValidationSignUp, checkUserNameExistInDatabase, userInputValidationSignIn, checkUserExistInDatabase, verifyJWT } = require("../middlewares/user.js");
const { addUserToDatabase, provideJWT, gerAllCourses, purchaseCourse, gerAllPurchasedCourses } = require("../controllers/userController.js");


// signup route-handler for user
router.post("/signup", userInputValidationSignUp, checkUserNameExistInDatabase, addUserToDatabase)

// singin route-handler -> whose controller will return jwt that includes username and id (object)
router.post("/signin", userInputValidationSignIn, checkUserExistInDatabase, provideJWT);

// courses route-handler -> returns all the courses present in db to valid / authenticated user
router.get("/courses", verifyJWT, gerAllCourses)

// route-handler -> to purchase course
router.post("/courses/:courseId", verifyJWT, purchaseCourse)

// route-handler -> to see all the purchased courses
router.get("/purchasedCourses", verifyJWT, gerAllPurchasedCourses)

module.exports = router;