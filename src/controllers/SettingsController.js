const formidable = require("formidable");
const uploadFolder = path.join(__dirname, "/src/public/uploads");

async function login(req, res) {
  res.render("settings/settings");
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

module.exports = {
  login,
  fileUpload,
};
