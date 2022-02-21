const home = async (req, res) => {
  res.render("explore/explore");
};

const searchItem = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(req.body);
  let products = ["prod1"];
  res.render("explore/searchResults", { products: products });
};

module.exports = {
  home,
  searchItem,
};
