import type express from "express";
import { validationResult } from "express-validator";
import { QueryValueError } from "./error.response";

class BodyMiddleware {
	verifyBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errMsg = "";
			errors.array().forEach((err) => {
				errMsg += `/ Field '${err.param}' with value '${err.value}' - ${err.msg}`;
			});
			next(QueryValueError(errMsg));
		}
		next();
	}

	/**
	 * Extract a given param from the url string
	 * @param param string name of the route param
	 */
	extractParam = (param: string) =>
		async function (req: express.Request, res: express.Response, next: express.NextFunction) {
			req.body[param] = req.params[param];
			next();
		};
}

export default new BodyMiddleware();
