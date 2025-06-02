const express = require("express");
const router = express.Router();
const { adminInputValidationSignIn, adminWithSameUserNameExist, adminInputValidationOtherRoutes, checkAdminExistInDatabase, verifyJWT } = require("../middlewares/admin.js");
const { addAdminToDatabase, provideJWT } = require("../controllers/adminController.js");
const { courseInputValidation } = require("../middlewares/course.js");
const { addAdminCourseToDatabase } = require("../controllers/courseController.js");


router.post("/signup", adminInputValidationSignIn, adminWithSameUserNameExist, addAdminToDatabase);

// this route have to provide jwt to the end user
router.post("/signin", adminInputValidationOtherRoutes, checkAdminExistInDatabase, provideJWT);


// Now all the routes down will have to verify the jwt 

router.post("/courses", verifyJWT, courseInputValidation, addAdminCourseToDatabase);

module.exports = router;