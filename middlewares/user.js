const z = require("zod");
const { User } = require("../db/db.js");
const usernameSchema = z.string().trim().min(3).regex(/^[A-Za-z0-9_]+$/);
const passwordSchema = z.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/);

function userInputValidationSignUp(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    let result = usernameSchema.safeParse(username);

    if(!result.success) {
        res.status(411).json({
            msg: "Invalid usernme",
            issues: result.error.issues
        })
        return
    }

    result = passwordSchema.safeParse(password);

    if(!result.success) {
        res.status(411).json({
            msg: "Password does not fullfil the requirements",
            issues: result.error.issues,
            name: result.error.name
        })
        return
    }

    next();
}

async function checkUserNameExistInDatabase(req, res, next) {
    const username = req.body.username;

    // checking in database username exist, validation for username is done
    try {
        const response = await User.findOne({
            username
        });

        if(response) {
            res.status(411).json({
                msg: "username already exist. Please try with different name",
            })
            return
        }

        next();
    } catch(err) {
        next(err);
    }
}

function userInputValidationSignIn(req, res, next) {
    const username = req.headers["username"];
    const password = req.headers["password"];

    let result = usernameSchema.safeParse(username);

    if(!result.success){
        res.status(411).json({
            msg: "username is invalid"
        })
        return
    }

    result = passwordSchema.safeParse(password);

    if(!result.success) {
        res.status(411).json({
            msg: "Password does not fullfil the requirements",
            issues: result.error.issues,
            name: result.error.name
        })
        return
    }

    next();
}

async function checkUserExistInDatabase(req, res, next) {
    const username = req.headers["username"];
    const password = req.headers["password"];

    try {
        const response = await User.findOne({
            username, password
        })

        if(!response) {
            res.status(403).json({
                msg: "username or passowrd is incorrect"
            })
            return
        }
        req.id = response._id; // represent the id of the user
        next();
    } catch (error) {
        next(error);
    }
}


module.exports = {
    userInputValidationSignUp,
    checkUserNameExistInDatabase,
    userInputValidationSignIn,
    checkUserExistInDatabase
}