/**
 * Generic routing class allowing easy recursive routing
 * ex: /users can use a router for /profile and an other for /auth
 */

import { Router } from "express";
import { debug } from "debug";

export abstract class Routes {
	public router: Router;
	public name: string;
	public log: debug.IDebugger;

	constructor(name: string) {
		this.name = name;
		this.log = debug("app:routes:" + this.name);
		this.router = Router();
		this.init();
	}

	protected init(): void {
		this.log("Routes initialized.");
	}
}
