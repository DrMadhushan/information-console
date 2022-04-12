const fs = require("fs");

function adminLogin(uname, pwd) {
  try {
    const jsonString = fs.readFileSync("./config.json");
    const appConfig = JSON.parse(jsonString);
    if (uname == appConfig.admin.uname && pwd == appConfig.admin.pwd) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    // console.log(err);
    return false;
  }
}

function userLogin(email, pwd) {
  //
}

module.exports = {
  adminLogin,
};
