const express = require("express");
const router = express.Router();
const { adminInputValidationSignIn, adminWithSameUserNameExist } = require("../middlewares/admin.js");
const { addAdminToDatabase } = require("../controllers/adminController.js");


router.post("/signup", adminInputValidationSignIn, adminWithSameUserNameExist, addAdminToDatabase);

module.exports = router;