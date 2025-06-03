const { User } = require("../db/db.js");

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


module.exports = {
    addUserToDatabase
}