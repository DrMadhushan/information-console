const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const server = express();

const port = process.env.port || 5000;

server.set("port", process.env.port || port); // set express to use this port
server.set("views", __dirname + "/src/views"); // set express to look in this folder to render our view
server.set("view engine", "ejs"); // configure template engine
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json()); // parse form data client
server.use(express.static(path.join(__dirname, "/src/public"))); // configure express to use public folder handle css + js files

server.get("/", async function (req, res) {
  // res.json({ hello: "world" });
  res.render("home", {});
});

server.get("/about", async function (req, res) {
  res.render("about");
});

module.exports = server;
