require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./model/database.js");
const status = require("./utils/status.js");

var app = express();

/* mysql db connection
connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("connect");
  }
});
// */

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "content-type, x-access-token");
  next();
});

app.get("/", (req, res) => {
  res.json(status.success("homepage"));
});
app.use("/api/users", require("./api/user"));
app.use("/api/auth", require("./api/auth"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
