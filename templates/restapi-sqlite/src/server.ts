/**
 * Server Set-up
 */

import express from "express";
import * as http from "http";
import cors from "cors";
import * as config from "./config";
import mainRouter from "./mainrouter";
import errorController from "./lib/errorController";

// Logs
import * as winston from "winston";
import * as expressWinston from "express-winston";

class Server {
	private readonly app: express.Application;
	private server: http.Server;
	private loggerOptions: expressWinston.LoggerOptions;

	constructor() {
		this.app = express();
		this.server = http.createServer(this.app);
		this.loggerOptions = {
			transports: [new winston.transports.Console()],
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.colorize({ all: true })
			)
		};

		this.init();
	}

	// Middlewares
	private init(): void {
		if (!config.DEBUG) {
			this.loggerOptions.meta = false; //shorter requests log when not debugging
		}
		this.app
			.use(express.json())
			.use(cors())
			.use(expressWinston.logger(this.loggerOptions))
			.use(mainRouter.router)

			// Unique Exit Point
			.use(errorController.handler);
	}

	public start() {
		this.server.listen(config.PORT, config.HOST, () => {
			console.log(`... Server listening at http://${config.HOST}:${config.PORT} ... `);
		});
	}
}

export default new Server();
