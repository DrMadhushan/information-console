async function login(req, res) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.render("package/dashboard");
}
async function signin(req, res) {}
module.exports = {
  login,
};
