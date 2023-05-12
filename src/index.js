const config = require("./config");

const server =
  new (require("bluetooth-serial-port").BluetoothSerialPortServer)();

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

  server.on("data", (buffer) => {
    const { item, value } = JSON.parse(buffer.toString());

    if (item === "read") {
      const fanValue = getPinValue(fan);
      writetoClient(JSON.stringify({ item: "fan", value: fanValue }));

      const lightValue = getPinValue(light);
      writetoClient(JSON.stringify({ item: "light", value: lightValue }));

      return;
    }

    switch (item) {
      case "fan":
        fan.writeSync(value ? 1 : 0);
        writetoClient(JSON.stringify({ item, value }));
        socket.emit("updateItem", JSON.stringify({ item, value }));
        break;
      case "light":
        light.writeSync(value ? 1 : 0);
        writetoClient(JSON.stringify({ item, value }));
        socket.emit("updateItem", JSON.stringify({ item, value }));
        break;
      default:
        console.log(`Attempted to update unknown item: ${item}`);
    }
  });

  server.listen(
    (clientAddress) => console.log("Client: " + clientAddress + " connected!"),
    (error) => console.error("Something wrong happened!:" + error)
  );
  initItems();
}
main();

async function initItems() {
  const fanValue = getPinValue(fan);
  socket.emit("updateItem", { item: "fan", value: fanValue });

  const lightValue = getPinValue(light);
  socket.emit("updateItem", {
    item: "light",
    value: lightValue,
  });
}

function getPinValue(pin) {
  return pin.readSync() === 1;
}

function writetoClient(data) {
  server.write(Buffer.from(data + "\n", "ascii"), (err, bytesWritten) => {
    if (err) console.log("Error!");
    else console.log("Send " + bytesWritten + " to the client!");
  });
}

process.on("SIGINT", () => {
  socket.disconnect();

  server.close();

  fan.unexport();
  light.unexport();
});
