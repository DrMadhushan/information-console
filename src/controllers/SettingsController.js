const formidable = require("formidable");
const auth = require("../authService");
const axios = require("axios");
const path = require("path");
const config = require("../../config.json");
const uploadFolder = path.join(__dirname, "../public/uploads");
const apiRoot = config.api.address;

async function login(req, res) {
  res.render("settings/login");
}
async function signin(req, res) {
  console.log(req.body.uname);
  console.log(req.body.pwd);
  console.log("logged? " + auth.adminLogin(req.body.uname, req.body.pwd));
  //
  if (auth.adminLogin(req.body.uname, req.body.pwd)) {
    query = apiRoot + "/locker";
    lockers = [];
    const response = await axios.get(query).catch(function (error) {
      console.log("Error when getting locker details");
      console.log(error);
    });
    if (response.status == 200) {
      response.data.forEach((locker_elem) => {
        if (locker_elem.orders != null) {
          lockers.push({
            locker_no: locker_elem.id,
            package_no: locker_elem.orders.id,
          });
        } else {
          lockers.push({
            locker_no: locker_elem.id,
            package_no: "Empty",
          });
        }
      });
      console.log("order response = ", response);
      res.render("settings/settings", { lockers: lockers });
    }
  } else {
    res.render("settings/login");
  }
}

async function fileUpload(req, res) {
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
}
async function openLocker(req, res) {
  try {
    console.log("Open Locker #" + req.body.lockerNo);
  } catch (error) {
    console.log(error);
  }
  // logic to open the locker
  // using mqtt
  console.log("finished");
}
async function closeApp() {
  console.log("send minimize");
  ipc.send("minimize");
}

module.exports = {
  login,
  signin,
  fileUpload,
  openLocker,
  closeApp,
};
