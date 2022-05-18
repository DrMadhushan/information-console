const fetch = require('node-fetch');
const apiRoot = "https://127.0.0.1:8000/api";

fetch('https://example.com')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })

const home = async (req, res) => {
  res.render("explore/explore");
};

const searchItem = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const apiUrl = apiRoot + "/"

  console.log(req.body);
  let products = ["prod1"];
  res.render("explore/searchResults", { products: products });
};

module.exports = {
  home,
  searchItem,
};
