/**
 * App Entrypoint
 */

// .env import
import dotenv from "dotenv";
const dotenvResult = dotenv.config();
import server from "./src/server";
import db from "./src/db.sqlite";
import { debug, IDebugger } from "debug";

if (dotenvResult.error) {
	throw dotenvResult.error;
}

const log: IDebugger = debug("app:main");
server.start();
log("DB connection is open?", db.open);
