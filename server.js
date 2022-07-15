const express = require("express");
const app = express(); 

app.get("/", (req, res) => {
    res.send("UMC server page!");
});

app.listen(3000, () => console.log("🚀successfully started!"));