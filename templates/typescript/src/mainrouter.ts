/**
 * Top level app routing ('/')
 */

import { Routes } from "./lib/routes.class";

export class MainRouter extends Routes {
	protected init(): void {
		this.log("Main Router is ready.");
	}
}

export default new MainRouter("main_router");
