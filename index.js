const express = require("express");
const db = require("./Develop/config/connection");
const routes = require("./Develop/routes");

const cwd = process.cwd();

const PORT = 3001;
const app = express();

const challenge = cwd.includes("Social-Network-API")
  ? cwd.split("/Social-Network-API/")
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for ${challenge} running on port ${PORT}!`);
  });
});
