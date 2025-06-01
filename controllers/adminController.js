const { Admin } = require("../db/db.js");

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



module.exports = {
    addAdminToDatabase
}