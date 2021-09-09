/**
 * Load environment config
 * Set in root .env file or set to defaults if none
 */
import debug from "debug";
import path from "path";
const log: debug.IDebugger = debug("app:env");

// DEFAULTS
const DEF_HOST = "localhost";
const DEF_PORT = 3000;
const DEF_USE_SQLITE = "true";
const DEF_SQLITE_DB_NAME = "appDB.db";
const DEF_SQLITE_DB_PATH = "/db_sqlite";
const DEF_SQLITE_INIT_SCRIPT_FILE_PATH = DEF_SQLITE_DB_PATH + "/init.sql";

// ----- DEV -----------------
export const ROOT_PATH = path.join(__dirname, "/../../"); // <--- Change if file is moved from /src/
export const DEBUG = !!process.env.DEBUG;

// ----- SERVER --------------
export const HOST: string = process.env.HOST || DEF_HOST;
export const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : DEF_PORT;

// ----- SQLITE --------------
export const USE_SQLITE: boolean = process.env.USE_SQLITE === DEF_USE_SQLITE;
let db_name: string | false = false;
let db_path: string | false = false;
let initScript: string | false = false;
if (USE_SQLITE) {
	if (!process.env.SQLITE_DB_NAME) {
		db_name = DEF_SQLITE_DB_NAME;
	} else {
		if (!/^(\w|-)+\.db$/.test(process.env.SQLITE_DB_NAME)) {
			throw new Error(
				"ENV Setup Error: SQLITE_DB_NAME is not valid: \n " +
					" - use alphanumeric, underscore and hyphen characters ONLY\n" +
					' - use extension ".db"'
			);
		} else {
			db_name = process.env.SQLITE_DB_NAME;
		}
	}
	if (!process.env.SQLITE_DB_PATH) {
		db_path = DEF_SQLITE_DB_PATH;
	} else {
		if (!/^\/?\.?(\w|-)+(\/\.?(\w|-)+)*\/?$/.test(process.env.SQLITE_DB_PATH)) {
			throw new Error(
				"ENV Setup Error: SQLITE_DB_PATH is not valid: \n " +
					" - use alphanumeric, underscore, hyphen characters ONLY for folder names\n" +
					' - trailing "/" are optional\n' +
					' - folder names can be prefixed with "."'
			);
		} else {
			db_path = process.env.SQLITE_DB_PATH;
		}
	}

	if (!process.env.SQLITE_INIT_SCRIPT_FILE_PATH) {
		initScript = DEF_SQLITE_INIT_SCRIPT_FILE_PATH;
	} else {
		if (
			!/^\/?\.?(\w|-)+(\/\.?(\w|-)+)*\/(\w|-)+.sql$/.test(process.env.SQLITE_INIT_SCRIPT_FILE_PATH)
		) {
			throw new Error(
				"ENV Setup Error: SQLITE_INIT_INIT_SCRIPT_FILE is not valid: \n " +
					" - use alphanumeric, underscore, hyphen characters ONLY for folder names\n" +
					' - starting "/" is optional\n' +
					' - folder names can be prefixed with "."' +
					' - file name must have ".sql" extension'
			);
		} else {
			initScript = process.env.SQLITE_INIT_SCRIPT_FILE_PATH;
		}
	}
}
export const SQLITE_DB_NAME: string = db_name ? db_name : "";
export const SQLITE_DB_PATH: string = db_path ? db_path : "";
export const SQLITE_INIT_SCRIPT_FILE_PATH: string = initScript ? initScript : "";

log("ROOT_PATH set to: ", ROOT_PATH);
log("HOST set to: ", HOST);
log("PORT set to: ", PORT);
log("USE_SQLITE set to: ", USE_SQLITE);
log("SQLITE_DB_NAME set to: ", SQLITE_DB_NAME);
log("SQLITE_DB_PATH set to: ", SQLITE_DB_PATH);
log("SQLITE_INIT_SCRIPT_FILE_PATH set to: ", SQLITE_INIT_SCRIPT_FILE_PATH);
