const express = require("express");
const router = express.Router();
const { adminInputValidationSignIn, adminWithSameUserNameExist, adminInputValidationOtherRoutes, checkAdminExistInDatabase } = require("../middlewares/admin.js");
const { addAdminToDatabase, provideJWT } = require("../controllers/adminController.js");


router.post("/signup", adminInputValidationSignIn, adminWithSameUserNameExist, addAdminToDatabase);

// this route have to provide jwt to the end user
router.post("/signin", adminInputValidationOtherRoutes, checkAdminExistInDatabase, provideJWT);


// Now all the routes down will have to verify the jwt 

module.exports = router;