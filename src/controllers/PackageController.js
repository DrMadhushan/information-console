const axios = require("axios");
const { options } = require("nodemon/lib/config");
const config = require("../../config.json");
const apiRoot = config.api;

ACCESS_TOKEN = "";
to_pickup = [];
to_return = [];

async function login(req, res) {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  if (ACCESS_TOKEN == "") {
    res.render("package/login", { message: "" });
  } else {
    let data = showPackages(req, res);
    // console.log(data);
    if ((await data).message == "success") {
      res.render("package/dashboard", {
        message: null,
        packages: (await data).packages,
      });
    } else {
      res.render("package/login", { message: (await data).message });
    }
  }
}
async function signin(req, res) {
  // console.log(req);
  // console.log(req.query);

  const response = await axios
    .post(apiRoot + "/auth/login", {
      email: req.query.email,
      password: req.query.password,
    })
    .catch(function (error) {
      console.log(error.response.status);
      res.render("package/login", { message: "Invalid email or password" });
      return;
    });

  console.log("token = " + response.data);
  ACCESS_TOKEN = response.data.token;
  let data = showPackages(req, res);
  // console.log(data);
  if ((await data).message == "success") {
    res.render("package/dashboard", {
      message: null,
      packages: (await data).packages,
    });
  } else {
    res.render("package/login", { message: (await data).message });
  }
  /*
  await axios({
    method: "post",
    url: apiRoot + "/auth/login",
    data: {
      email: req.query.email,
      password: req.query.password,
    },
  })
    .then(function (response) {
      console.log("token = " + response.data);
      ACCESS_TOKEN = response.data.token;
      showPackages();
    })
    .catch(function (error) {
      console.log(error.response.status);
      res.render("package/login", { message: "Invalid email or password" });
      return;
    });
    */
}

async function showPackages() {
  const response = await axios
    .get(apiRoot + "/auth/user/orders", {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
    .catch(function (error) {
      // res.render("package/login", { message: "Login to view your cart" });
      return { message: "Login to view your cart" };
    });
  if (response.status != 200) {
    // res.render("package/login", { message: "Login to view your cart" });
    return { message: "Login to view your cart" };
  }
  // console.log(response.data[0]);
  // res.render("package/dashboard", { packages: response.data });
  return { message: "success", packages: response.data };
}

async function showPackage(req, res) {
  console.log("showing packages");
  console.log(req.query.id);
  const response = await axios
    .get(apiRoot + "/auth/user/orders/" + req.query.id, {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
    .catch(function (error) {
      // res.render("package/login", { message: "Login to view your cart" });
      return { message: "Login to view your cart" };
    });
  if (response.status != 200) {
    // res.render("package/login", { message: "Login to view your cart" });
    return { message: "Login to view your cart" };
  }
  // console.log(response.data);
  // let isready = response.data.status == 'ready' ? true : false;
  let isready = response.data.status == "pending" ? true : false;

  res.render("package/package", { package: response.data, isready: isready });
}

async function pickupPackage(req, res) {
  console.log("query.id = " + req.query.id);
  const response = await axios
    .get(apiRoot + "/auth/user/orders/" + req.query.id + "/otp", {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
    .catch(function (error) {
      // res.render("package/login", { message: "Login to view your cart" });
      return { message: "Login to view your cart" };
    });
  console.log(response.data);
  res.render("package/enterOtp", { id: req.query.id });
}

async function confirmOtp(req, res) {
  const response = await axios
    .get(
      apiRoot + "/auth/user/orders/" + req.query.id + "/otp/" + req.query.otp,
      {
        headers: {
          Authorization: "Bearer " + ACCESS_TOKEN,
        },
      }
    )
    .catch(function (error) {
      // res.render("package/login", { message: "Login to view your cart" });
      return { message: "OTP confirmation failed" };
    });
  console.log(response.data);
  let isOTPCorrect = response.data;
  if (isOTPCorrect) {
    ACCESS_TOKEN = "";
    res.render("package/receptionSuccess");
  } else {
    res.render("package/receptionFail");
  }
}

module.exports = {
  login,
  signin,
  showPackage,
  pickupPackage,
  confirmOtp,
};
