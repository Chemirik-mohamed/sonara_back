import { createMiddleware } from "hono/factory";

export const loggerMiddleware = createMiddleware(async (c, next) => {
	console.log(`${c.req.method} ${c.req.path}`);

	await next();
});
