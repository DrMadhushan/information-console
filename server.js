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
  let images = ["1.jpg", "2.jpg", "3.jpg"];
  res.render("home", { images: images });
});
server.get("/about", async function (req, res) {
  res.render("about");
});
server.get("/userLogin", async function (req, res) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.render("package/login");
});
server.get("/info", async function (req, res) {
  res.render("info/help");
});
server.get("/adminLogin", async function (req, res) {
  res.render("settings/login");
});
server.get("/explore", async function (req, res) {
  // res.render("explore/explore");
  res.render("explore/searchResults");
});
server.get("*", async function (req, res) {
  res.status(404).render("404");
});

module.exports = server;
