const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Sensor connected to MQTT");

  setInterval(() => {
    const data = {
      temperature: (20 + Math.random() * 10).toFixed(2),
      humidity: (40 + Math.random() * 20).toFixed(2),
      timestamp: Date.now(),
    };

    client.publish("iot/sensor", JSON.stringify(data));

    console.log("Publish:", data);
  }, 2000);
});
