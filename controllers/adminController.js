const { Admin } = require("../db/db.js");
const jwt = require("jsonwebtoken");
const jwtSecret = "secret123="

async function addAdminToDatabase(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const admin = new Admin({
        username, password
    })

    try {
        const response = await admin.save();

        res.status(200).json({
            msg: "admin added to the database",
            admin: response
        })
    } catch(err) {
        next(err);
    }
}

function provideJWT(req, res) {
    const username = req.headers["username"];

    // sign the JSON with username
    const token = jwt.sign(JSON.stringify({
        username
    }), jwtSecret);


    res.status(200).json({
        token
    })
}



module.exports = {
    addAdminToDatabase,
    provideJWT
}