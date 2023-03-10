const { config } = require("dotenv");
config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "build/index.html"));
});

app.listen(process.env.VUE_APP_PRODUCTION_PORT || 3001, () => {
  console.log(
    `Express server is listening on ${
      process.env.VUE_APP_PRODUCTION_PORT || 3001
    }`
  );
});
