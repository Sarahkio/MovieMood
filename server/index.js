const express = require("express");
const path = require("path");
const morgan = require("morgan");

const PORT = 8000;

var app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});
