const express = require("express");
const http = require("http");
const mqtt = require("mqtt");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const mqttClient = mqtt.connect("mqtt://localhost:1883");

let latestData = {};

mqttClient.on("connect", () => {
  console.log("Connected to MQTT");
  mqttClient.subscribe("iot/sensor");
});

mqttClient.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());

  latestData = data;

  console.log("Receive:", data);

  io.emit("sensor", data);
});

app.get("/sensor", (req, res) => {
  res.json(latestData);
});

server.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
