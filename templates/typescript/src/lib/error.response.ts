export interface IResponse {
	name: string;
	message: string;
	status: number;
}

abstract class Response implements IResponse {
	name = "";
	message = "";
	status = 200;

	constructor(message: string, status?: number) {
		this.message = message;
		this.status = status ? status : this.status;
	}
}

class QueryError extends Response {
	name = "QueryError";
	status = 400;
}

class ServerError extends Response {
	name = "InternalError";
	status = 500;
}

class TokenError extends Response {
	name = "TokenError";
	status = 401;
}

class AuthError extends Response {
	name = "AuthError";
	status = 401;
}

export const InvalidPath = (method: string): IResponse => {
	return { name: method, message: "Unexpected path", status: 403 };
};

export const InternalError = (err: any): Response => {
	return new ServerError(err.message);
};

export const QueryFieldError = (field: string): IResponse => {
	return new QueryError(`Expected field: ${field}`);
};

export const QueryValueError = (field: string): IResponse => {
	return new QueryError(`Unexpected value: ${field}`);
};

export const QueryIdError = (): IResponse => new QueryError("Unexpected id", 404);
export const QueryFoundError: IResponse = new QueryError("Items not found", 404);
export const QueryFileError: IResponse = new QueryError("Unexpected file");

export const AuthEmailError: IResponse = new AuthError("Unexpected email");
export const AuthPasswdError: IResponse = new AuthError("Unexpected passwd");
export const AuthHeaderError: IResponse = new AuthError("Unexpected Authorization");

export const TokenSignError: IResponse = new TokenError("Unexpected signature");
export const TokenBuffError: IResponse = new TokenError("Unexpected buffer");
export const TokenPermError: IResponse = new TokenError("Unexpected permission");
export const TokenExpError: IResponse = new TokenError("Expirated");
