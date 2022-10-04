// const fetch = require("node-fetch");
// import fetch from "node-fetch";
// const fetch = import('node-fetch');
const axios = require("axios");
const apiRoot = "http://127.0.0.1:4000/api";

// fetch('https://example.com')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })

const home = async (req, res) => {
  res.render("explore/explore");
};

const searchItem = async (req, res) => {
  // await new Promise((resolve) => setTimeout(resolve, 20));
  const search_keyword = req.query.keyword;
  const query = apiRoot + "/search?q=" + search_keyword;
  // console.log(typeof search_keyword);
  const response = await axios.get(query).catch(function (error) {
    console.log(error);
  });

  if (response.status == 200) {
    results = [];
    response.data["Equipment Items"].forEach((element) => {
      // console.log(search_keyword + " ----> " + element.title);
      if (element.title.toLowerCase().includes(search_keyword.toLowerCase())) {
        results.push(element);
      }
    });
    response.data["Component Items"].forEach((element) => {
      // console.log(search_keyword + " ----> " + element.title);
      if (element.title.toLowerCase().includes(search_keyword.toLowerCase())) {
        results.push(element);
      }
    });
    res.render("explore/searchResults", { products: results });
  } else {
    console.log(response.status);
  }
};

module.exports = {
  home,
  searchItem,
};

// await axios({
//   method: "get",
//   url: apiRoot + "/search?q=" + search_keyword,
// })
//   .then(function (results) {
//     console.log("results = ", results[0]);
//     let products = ["prod1"];
//     res.render("explore/searchResults", { products: products });
//   })
//   .catch(function (error) {
//     console.error();
//   });
