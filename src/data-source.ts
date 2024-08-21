import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { config } from "dotenv";
import * as PostgressConnectionStringParser from "pg-connection-string";

config();
const db_url = process.env.PG_CONNECTION_STRING;
const connectionOptions = PostgressConnectionStringParser.parse(db_url);

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: connectionOptions.host,
  port: parseInt(connectionOptions.port),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
  extra: {
    ssl: true,
  },
});
