const express = require("express");
const app = express();
const connection = require('./config/database.js');

connection.connect(function(err) {
    if (err) {
      throw err;
    } else {
      console.log("connect");
    }
  });  

app.get("/", (req, res) => {
    res.send("UMC server page! luna work");
});

app.listen(3000, () => console.log("successfully started!"));