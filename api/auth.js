require("dotenv").config();
var express = require("express");
var router = express.Router();
var status = require("../utils/status.js");
var bcrypt = require("bcrypt");
const mysql = require("mysql2");
const { User } = require("../model/model.js");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

router.post("/register", async function (req, res) {
  var data = req.body;
  var email = data.email;
  var password = data.password;
  const hashPwd = await bcrypt.hash(password, 10);
  var username = data.username;
  const user = await User.create({ username, password: hashPwd, email });
  return res.json(status.success(user.username));
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
    if (!isValid) return res.json(status.parseError(validationError));
    else next();
  },
  async function (req, res, next) {
    User.findOne({ where: { username: req.body.username } })
      .then((row) => {
        bcrypt.compare(req.body.password, row.password, function (err, result) {
          if (err) return res.json(status.failure(err, "bcrypt error"));
          else if (!result)
            return res.json(status.failure(err, "wrong password"));
          else {
            const payload = {
              username: row.username,
            };
            const secretKey = process.env.JWT_SECRET;
            const opts = { expiresIn: 60 * 60 * 24 };
            jwt.sign(payload, secretKey, opts, function (err, token) {
              if (err) return res.json(status.parseError(err));
              // console.log(token);
              res.json(status.success(token));
            });
            // res.json(status.success("test"));
          }
        });
      })
      .catch(function (err) {
        res.json(status.failure(err, "login failed"));
      });
  }
);

module.exports = router;
