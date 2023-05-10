const config = require("./config");

const Gpio = require("onoff").Gpio;

const { io } = require("socket.io-client");

const socket = io(config.WS_ENDPOINT);

const fan = new Gpio(config.FAN_PIN, "out", "none", {
  reconfigureDirection: false,
});
const light = new Gpio(config.LIGHT_PIN, "out", "none", {
  reconfigureDirection: false,
});

function main() {
  socket.on("itemUpdated", ({ item, value }) => {
    switch (item) {
      case "fan":
        fan.writeSync(value ? 1 : 0);
        break;
      case "light":
        light.writeSync(value ? 1 : 0);
        break;
      default:
        console.log(`Attempted to update unknown item: ${item}`);
    }
  });
  initItems();
}
main();

async function initItems() {
  const fanValue = fan.readSync() === 1;
  socket.emit("updateItem", { item: "fan", value: fanValue });

  const lightValue = light.readSync() === 1;
  socket.emit("updateItem", { item: "light", value: lightValue });
}

process.on("SIGINT", () => {
  socket.disconnect();

  fan.unexport();
  light.unexport();
});
