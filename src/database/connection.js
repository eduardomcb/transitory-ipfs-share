import mongoose from "mongoose";
import constants from "../config/constants";
import chalk from "chalk";

function initNewConnection(uri, serv) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  db.on("error", function (error) {
    console.log(
      chalk.green.bold(
        `
        MongoDB :: connection ${serv} ${JSON.stringify(error)}
  `
      )
    );
    db.close().catch(() =>
      console.log(
        chalk.green.bold(
          `
        MongoDB :: failed to close connection ${this.name}
    `
        )
      )
    );
  });

  db.on("connected", function () {
    console.log(
      chalk.green.bold(
        `
        MongoDB :: connected ${serv}
  `
      )
    );
  });

  db.on("disconnected", function () {
    console.log(
      chalk.green.bold(
        `
        MongoDB :: disconnected ${serv}
  `
      )
    );
  });

  return db;
}
const database = initNewConnection(constants.MONGO_URI, "database");
export { database };
