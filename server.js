const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const PORT = process.env.IOS_API_PORT;
require("./routers/meeting_spot.router.js")(app);
require("./routers/user.router.js")(app);
require("./routers/avatar.router.js")(app);


const db = require("./models");

db.sequelize
  .sync({ force: true, logging: false })
  .then(async () => {
    console.log("Synced db.");
    require("./seeders/all.seeder.js");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}.`);
});
