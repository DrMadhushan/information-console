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
items = [];
const home = async (req, res) => {
  res.render("explore/explore");
};

const searchItem = async (req, res) => {
  // await new Promise((resolve) => setTimeout(resolve, 20));
  const search_keyword = req.query.keyword;
  const query = apiRoot + "/search?term=" + search_keyword;
  // console.log(typeof search_keyword);
  const response = await axios.get(query).catch(function (error) {
    console.log("Hello World");
    console.log(error);
  });

  if (response.status == 200) {
    items = [];
    response.data["Equipment Items"].forEach((element) => {
      // console.log(search_keyword + " ----> " + element.title);
      // if (element.title.toLowerCase().includes(search_keyword.toLowerCase())) {
      items.push(element);
      // }
    });
    response.data["Component Items"].forEach((element) => {
      // console.log(search_keyword + " ----> " + element.title);
      // if (element.title.toLowerCase().includes(search_keyword.toLowerCase())) {
      items.push(element);
      // }
    });

    res.render("explore/searchResults", { products: items, message: null });
  } else {
    res.render("explore/searchResults", {
      message: "No related components or equipment found!",
    });
    console.log(response.status);
  }
};

const showItem = async (req, res) => {
  console.log(req.query.itemId);
  let show_item = null;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id == req.query.itemId) {
      show_item = items[i];
      break;
    }
  }

  /*
  show_item = {
    id: 1001,
    code: "",
    title: "Arduino UNO REV3",
    brand: "Arduino",
    productCode: "Uno v3",
    quantity: 10,
    specifications: "ATMega328p Microcontroller",
    description:
      "The Arduino Uno is an open-source microcontroller board based on the Microchip ATmega328P microcontroller and developed by Arduino.cc. The board is equipped with sets of digital and analog input/output (I/O) pins that may be interfaced to various expansion boards (shields) and other circuits.",
    instructions: null,
    isAvailable: 1,
    isElectrical: 1,
    powerRating: null,
    price: 1200,
    thumb: "comit1002.jpg",
    size: "medium",
    created_at: "2021-08-04T15:23:56.000000Z",
    updated_at: "2021-09-02T05:41:38.000000Z",
    component_type_id: 16,
    pivot: {
      order_id: 1,
      component_item_id: 1001,
      quantity: 1,
    },
  };
  */
  // console.log(show_item);
  // res.render("explore/itemPage");
  res.render("explore/itemPage", { item: show_item });
};

module.exports = {
  home,
  searchItem,
  showItem,
};
