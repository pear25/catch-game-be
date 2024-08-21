import { AppDataSource } from "./data-source";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./user/userRoutes");
const corsOptions = require("./config/cors");
const errorHandler = require("./errorHandler");

const LOCAL_PORT = process.env.PORT || 3000;
const PROD_PORT = process.env.API_URL || "";
const isProd = process.env.PROD === "true";

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));

async function main() {
  await AppDataSource.initialize()
    .then(() => console.log("created user table"))
    .catch((error) => console.log(error));

  app.use(errorHandler);
  app.use("/user", userRoutes);

  app.listen(isProd ? PROD_PORT : LOCAL_PORT, () => {
    console.log(`Server is running on port ${isProd ? PROD_PORT : LOCAL_PORT}`);
  });
}

main();
