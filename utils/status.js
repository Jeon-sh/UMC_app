require("dotenv").config();
var jwt = require("jsonwebtoken");

var status = {};

status.success = function (data) {
  return {
    success: true,
    message: null,
    errors: null,
    data: data,
  };
};

status.failure = function (err, message) {
  if (!err && !message) message = "data not found";
  return {
    success: false,
    message: message,
    errors: err ? status.parseError(err) : null,
    data: null,
  };
};

status.parseError = function (errors) {
  var parsed = {};
  if (errors.name == "ValidationError") {
    for (var name in errors.errors) {
      var validationError = errors.errors[name];
      parsed[name] = { message: validationError.message };
    }
  } else if (errors.code == "11000" && errors.errmsg.indexOf("username") > 0) {
    parsed.username = { message: "This username already exists!" };
  } else {
    parsed.unhandled = errors;
  }
  return parsed;
};

// middlewares
status.isLoggedin = function (req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token) return res.json(status.success(null, "token is required!"));
  else {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) return res.json(status.failure(err));
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = status;
