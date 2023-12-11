const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config()

const PORT = process.env.IOS_API_PORT;

const db = require("./models");

db.sequelize.sync({ force: true, logging: false })
  .then(async () => {
    console.log("Synced db.");
    require("./seeders/meeting_spots.seeder.js");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}.`);
});