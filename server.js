const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./config/database.js");
const sequelize = require("./config/database.js");

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
    console.log("connected --");
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
  res.send("UMC server page!");
});
app.use("/api/users", require("./api/user"));
app.use("/api/auth", require("./api/auth"));

app.listen(3000, () => console.log("successfully started!"));
