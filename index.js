const express = require("express");
const app = express();
const adminRouter = require("./routes/adminRouter.js");
const { connection_url } = require("./constants.js");
const port = 3000;
const { connection } = require("./db/db.js");

connection(connection_url);

app.use(express.json());

app.use("/admin", adminRouter);





// global catches
app.use(function(err, req, res, next) {
  if(err) {
    res.status(500).json({
      msg: "Something up with the server"
    })
    return
  }

  next();
})

// route not found middleware
app.use(function(req, res, next) {
  res.status(404).json({
    msg:"Route not found"
  })
})

app.listen(port)