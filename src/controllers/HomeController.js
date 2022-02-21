async function home(req, res) {
  let images = ["1.jpg", "2.jpg", "3.jpg"];
  res.render("home", { images: images });
}
module.exports = {
  home,
};
