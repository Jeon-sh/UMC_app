const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("UMC server page! luna work");
});

app.listen(3000, () => console.log("?Ÿš?successfully started!"));