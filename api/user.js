var express = require("express");
var router = express.Router();
const { User } = require("../model/model.js");
var status = require("../utils/status.js");

router.get("/me", status.isLoggedin, function (req, res, next) {
  User.findOne({ where: { username: req.decoded.username } }).then(
    (user, err) => {
      if (err || !user) return res.json(status.failure(err, "login failed"));
      res.json(status.success(user));
    }
  );
});

module.exports = router;
