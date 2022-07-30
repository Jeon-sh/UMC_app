var express = require("express");
var router = express.Router();
var status = require("../status.js");

router.get("/me", function (req, res) {
  res.json(status.success("connected"));
});

module.exports = router;
