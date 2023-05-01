require("dotenv").config();

module.exports = {
  WS_ENDPOINT: process.env.WS_ENDPOINT ?? "http://localhost",
  LIGHT_PIN: process.env.LIGHT_PIN ?? 4,
  FAN_PIN: process.env.FAN_PIN ?? 6,
};
