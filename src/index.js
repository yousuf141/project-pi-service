const config = require("./config");

const Gpio = require("onoff").Gpio;

const { io } = require("socket.io-client");

const socket = io(config.WS_ENDPOINT);

const fan = new Gpio(config.FAN_PIN, "out");
const light = new Gpio(config.LIGHT_PIN, "out");

function main() {
  socket.on("itemUpdated", ({ item, value }) => {
    switch (item) {
      case "fan":
        fan.writeSync(value === 1);
        break;
      case "light":
        light.writeSync(value === 1);
      default:
        console.log(`Attempted to update unknown item: ${item}`);
    }
  });
  initItems();
}
main();

async function initItems() {
  const fanValue = fan.readSync() === 1;
  console.log("FAN VALUE: " + fanValue);
  socket.emit("updateItem", { item: "fan", value: fanValue });

  const lightValue = light.readSync() === 1;
  console.log("LIGHT VALUE: " + lightValue);
  socket.emit("updateItem", { item: "light", value: lightValue });
}

process.on("SIGINT", () => {
  fan.unexport();
  light.unexport();

  socket.disconnect();
});
