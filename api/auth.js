var express = require("express");
var router = express.Router();
var status = require("../status.js");
var bcrypt = require("bcrypt-nodejs");
const db = require("../config/database.js");
const mysql = require("mysql2");
const { User } = require("../model/model.js");
const { json } = require("body-parser");

router.post("/register", function (req, res) {
  var salt = bcrypt.genSaltSync(10);
  var data = req.body;
  var email = data.email;
  var password = data.password;
  var hashPwd = bcrypt.hashSync(password, salt);
  var username = data.username;
  db.query(
    `insert into users(username, password, email) value(?, ?, ?)`,
    [username, hashPwd, email],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(status.success(username));
    }
  );
  return router;
});

router.post(
  "/login",
  async function (req, res, next) {
    var isValid = true;
    var validationError = {
      name: "ValidationError",
      errors: {},
    };
    if (!req.body.username) {
      isValid = false;
      validationError.errors.username = { message: "Username is required!" };
    }
    if (!req.body.password) {
      isValid = false;
      validationError.errors.password = { message: "Password is required!" };
    }
    if (!isValid) return res.json(util.successFalse(validationError));
    else next();
  },
  function (req, res, next) {
    User.findOne({ where: { username: req.body.username } })
      .then((row) => {
        console.log(row);
      })
      .catch(function (err) {
        res.json(status.failure(err, "login failed"));
      });
    res.json(status.success("test"));
  }
);

module.exports = router;
