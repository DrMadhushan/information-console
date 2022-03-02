const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const HomeController = require("./src/controllers/HomeController");
const PackageController = require("./src/controllers/PackageController");
const InformationController = require("./src/controllers/InformationController");
const SettingsController = require("./src/controllers/SettingsController");
const SearchController = require("./src/controllers/SearchController");

const server = express();
const port = process.env.port || 5000;

server.set("port", process.env.port || port); // set express to use this port
server.set("views", __dirname + "/src/views"); // set express to look in this folder to render our view
server.set("view engine", "ejs"); // configure template engine

server.use(express.urlencoded());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json()); // parse form data client
server.use(express.static(path.join(__dirname, "/src/public"))); // configure express to use public folder handle css + js files

// get
server.get("/", HomeController.home);
server.get("/userLogin", PackageController.login);
server.get("/info", InformationController.help);
server.get("/adminLogin", SettingsController.login);
server.get("/explore", SearchController.home);
server.get(`/search`, SearchController.searchItem);

server.post("/openLocker", SettingsController.openLocker);

// post
server.post("/uploadBanner", SettingsController.fileUpload);

// 404
server.get("*", async function (req, res) {
  res.status(404).render("404");
});

module.exports = server;
