var express = require("express");
var router = express.Router();
var status = require("../status.js");
var bcrypt = require("bcrypt-nodejs");
const db = require("../config/database.js");

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
module.exports = router;
