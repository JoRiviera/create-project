import type { ValidationChain } from "express-validator";
import { dateIsYear, dateIsYearMonth } from "../../lib/regexValidation";

export const validateBool = (chain: ValidationChain): ValidationChain => {
	return chain
		.trim()
		.escape()
		.notEmpty()
		.withMessage("Value is empty.")
		.isBoolean()
		.withMessage(`"true" or "false" only.`)
		.toBoolean();
};

export const validateString = (chain: ValidationChain): ValidationChain => {
	return chain.trim().escape().notEmpty().withMessage("Value is empty.");
};

export const validateDate = (chain: ValidationChain): ValidationChain => {
	return chain
		.trim()
		.escape()
		.notEmpty()
		.withMessage("Value is empty.")
		.isISO8601()
		.withMessage("Not ISO8601.");
};

export const validateInt = (chain: ValidationChain): ValidationChain => {
	return chain.notEmpty().trim().isInt().withMessage("Not an integer.").toInt();
};

export const validatePositiveInt = (chain: ValidationChain): ValidationChain => {
	return chain
		.notEmpty()
		.trim()
		.isInt({ min: 0 })
		.withMessage("Not an integer or negative int.")
		.toInt();
};

export const validateMinDate = (chain: ValidationChain): ValidationChain => {
	return validateDate(chain).customSanitizer((value) => {
		if (dateIsYear(value)) {
			return value.concat("-01-01");
		}
		if (dateIsYearMonth(value)) {
			return value.concat("-01");
		}
		return value;
	});
};
export const validateMaxDate = (chain: ValidationChain): ValidationChain => {
	return validateDate(chain).customSanitizer((value) => {
		if (dateIsYear(value)) {
			return value.concat("-12-31");
		}
		if (dateIsYearMonth(value)) {
			if (typeof value === "string") {
				const date = value.split("-").map((val) => parseInt(val));
				return new Date(date[0], date[1], 0).toISOString();
			}
		}
		return value;
	});
};
