// renderer.js
const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);
const config = require("./config.json");
const mqtt = require("mqtt");
const PackageController = require("./src/controllers/PackageController");
const server = require("./server");
const axios = require("axios");

const port = process.env.port || 5000;

const host = config.mqtt.host;

const options = {
  keepalive: 30,
  clientId: clientId,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  username: "makermate",
  password: "makermate",
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
  rejectUnauthorized: false,
};

// Information about the mqtt module is available
console.log(mqtt);

console.log("connecting mqtt client");
const client = mqtt.connect(host, options);

client.on("error", (err) => {
  console.log("Connection error: ", err);
  client.end();
});

client.on("reconnect", () => {
  console.log("Reconnecting...");
});

client.on("connect", () => {
  console.log("Client connected:" + clientId);
  client.subscribe(config.mqtt.subTopic, {
    qos: 0,
  });
  // setInterval(
  //     () =>
  //       client.publish("makermate/lock", "from app", {
  //         qos: 0,
  //         retain: false,
  //       }),
  //     3000
  //   );
});

client.on("message", (topic, message, packet) => {
  console.log(
    "Received Message: " + message.toString() + "\nOn topic: " + topic
  );
  if (message == "logout") {
    axios.get("http://127.0.0.1:" + port + "/logout");
  }
});

module.exports = client;
