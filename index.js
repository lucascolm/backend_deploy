const config = require(__dirname + "/src/config/config.js");
require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// const port = process.env.PGPORT || 3001;
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(config.server.port, () => {
    console.log(`App listening on port ${config.server.port}`); // eslint-disable-line no-console
  });
});
