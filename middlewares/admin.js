const z = require("zod");
const jwt = require("jsonwebtoken");
const { Admin } = require("../db/db");
const { jwtSecret } = require("../constants.js")
const adminUserNameSchema = z.string().min(3).regex(/^[A-Za-z0-9_]+$/);
const adminPasswordSchame = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/);


function adminInputValidationSignIn(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    let result = adminUserNameSchema.safeParse(username)

    if(!result.success) {
        res.status(411).json({
            msg: "admin username does not follows the input format",
            issues: result.error.issues,
            name: result.error.name
        })
        return
    }

    result = adminPasswordSchame.safeParse(password);

    if(!result.success) {
        res.status(411).json({
            msg: "admin password does not follows the input format"
        })
        return
    }

    // validation done
    next();
}

async function adminWithSameUserNameExist(req, res, next) {
    // checking same username for admin exist in admin collection
    const username = req.body.username; // we have checked the username follows the format

    try {
        const response = await Admin.findOne({
            username
        })

        if(response) {
            res.status(411).json({
                msg: "Admin with this username already exist"
            })
            return
        }

        next();
    } catch(err) {
        next(err);
    }
}

async function adminInputValidationOtherRoutes(req, res, next) {
    const username = req.headers["username"];
    const password = req.headers["password"];


    let result = adminUserNameSchema.safeParse(username)

    if(!result.success) {
        res.status(411).json({
            msg: "admin username does not follows the input format",
            issues: result.error.issues,
            name: result.error.name
        })
        return
    }

    result = adminPasswordSchame.safeParse(password);

    if(!result.success) {
        res.status(411).json({
            msg: "admin password does not follows the input format"
        })
        return
    }

    // validation done
    next();
}

async function checkAdminExistInDatabase(req, res, next) {
    const username = req.headers["username"];
    const password = req.headers["password"];

    // checking the username and password exist in database
    try {
        const response = await Admin.findOne({
            username, password
        })

        if(!response) {
            res.status(411).json({
                msg: "Either username or password is incorrect"
            })
            return
        }

        next(); // we can no provide jwt to the admin
    } catch(err) {
        next(err);
    }


}

function verifyJWT(req, res, next) {
    let token = req.headers["token"];

    const tokenSchema = z.string().startsWith("Bearer ");

    const result = tokenSchema.safeParse(token);

    if(!result.success) {
        res.status(403).json({
            msg: "Your token invalid",
        })

        return
    }

    const splitToken = token.split(" ")[1];


    // verifyJWT know
    try {
        const token = jwt.verify(splitToken, jwtSecret);
        console.log(token);

        next();
    } catch(err) {
        res.status(403).json({
            msg: "Invalid token sent",
        })
    }
    
}

module.exports = {
    adminInputValidationSignIn,
    adminWithSameUserNameExist,
    adminInputValidationOtherRoutes,
    checkAdminExistInDatabase,
    verifyJWT
}