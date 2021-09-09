/**
 * SQLite database object
 * The app uses a single unique database file
 */

import Database from "better-sqlite3";
import debug from "debug";
import path from "path";
import * as config from "./config";
import fs from "fs";

const log: debug.IDebugger = debug("app:SQLite");

class DBSqlite extends Database {
	constructor() {
		if (!config.USE_SQLITE) {
			throw new Error(
				"USE_SQLITE is set to false, can't proceed with the execution unless set to true."
			);
		}
		const fullpath = path.join(config.ROOT_PATH, config.SQLITE_DB_PATH, config.SQLITE_DB_NAME);
		log("Full DB path: ", fullpath);
		try {
			super(fullpath, { fileMustExist: true });
		} catch (e) {
			try {
				log(`Creating database: ${fullpath}`);
				super(fullpath);
				const initFile = fs.readFileSync(
					path.join(config.ROOT_PATH, config.SQLITE_INIT_SCRIPT_FILE_PATH),
					"utf-8"
				);
				log("Execution of SQl init file: ", initFile);
				this.exec(initFile);
			} catch (e) {
				// TODO Implement custom error handling & logging
				process.exit(-1);
				//throw e;
			}
		}
	}
}

export default new DBSqlite();
