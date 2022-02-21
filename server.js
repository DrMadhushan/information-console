const express = require("express");
const bodyParser = require("body-parser");
const window = require("./app");
const path = require("path");
const formidable = require("formidable");
const { BrowserWindow } = require("electron");

const server = express();
const uploadFolder = path.join(__dirname, "/src/public/uploads");
const port = process.env.port || 5000;

server.set("port", process.env.port || port); // set express to use this port
server.set("views", __dirname + "/src/views"); // set express to look in this folder to render our view
server.set("view engine", "ejs"); // configure template engine
server.use(express.urlencoded());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json()); // parse form data client
server.use(express.static(path.join(__dirname, "/src/public"))); // configure express to use public folder handle css + js files

server.get("/", async function (req, res) {
  let images = ["1.jpg", "2.jpg", "3.jpg"];
  res.render("home", { images: images });
});
server.get("/userLogin", async function (req, res) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.render("package/login");
});
server.get("/info", async function (req, res) {
  window.fullscreen = true;
  res.render("info/help");
});
server.get("/adminLogin", async function (req, res) {
  res.render("settings/settings");
});
server.get("/explore", async function (req, res) {
  res.render("explore/itemPage");
});
server.get(`/search`, async function (req, res) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(req.body);
  let products = ["prod1"];
  res.render("explore/searchResults", { products: products });
});

server.post("/uploadBanner", (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadFolder;
  form
    .on("error", function (err) {
      throw err;
    })
    .on("field", function (field, value) {
      //receive form fields here
    })
    /* this is where the renaming happens */
    .on("fileBegin", function (name, file) {
      //rename the incoming file to the file's name
      file.filepath = form.uploadDir + "/" + "newBanner.png";
    })
    .on("file", function (field, file) {
      //On file received
    })
    .on("progress", function (bytesReceived, bytesExpected) {
      // self.emit('progess', bytesReceived, bytesExpected)
      // var percent = ((bytesReceived / bytesExpected) * 100) | 0;
      // process.stdout.write("Uploading: %" + percent + "\r");
    })
    .on("end", function () {});
  form.parse(req);
  // console.log(form);
  res.render("settings/settings");
});

server.get("*", async function (req, res) {
  res.status(404).render("404");
});

module.exports = server;
