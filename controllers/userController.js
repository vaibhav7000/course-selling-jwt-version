const { User } = require("../db/db.js");
const { jwtSecret } = require("../constants.js");
const jwt = require("jsonwebtoken");

async function addUserToDatabase(req, res,  next) {
    const username = req.body.username;
    const password = req.body.password;

    const dbUser = new User({
        username, password
    })

    try {
        const response = await dbUser.save();

        res.status(201).json({
            msg: "User added to the database",
            user: response
        })
    } catch(err) {
        next(err);
    }
}

function provideJWT(req, res, next) {
    const username = req.headers["username"];
    const id = req.id;

    const token = jwt.sign(JSON.stringify({
        username, id
    }), jwtSecret);

    res.status(200).json({
        token: `Bearer ${token}`,
    })
}


module.exports = {
    addUserToDatabase,
    provideJWT
}