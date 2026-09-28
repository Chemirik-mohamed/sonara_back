import { Hono } from "hono";
import { cors } from "hono/cors";
import { errorHandler } from "./errors/error.handler";
import { auth } from "./lib/auth";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { healthRoutes } from "./modules/health/health.routes";
import { generateRoutes } from "./modules/tts/tts.routes";

export const app = new Hono().basePath("/api");

app.use("*", loggerMiddleware);

app.use(
	"*",
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

app.all("/auth/*", (c) => auth.handler(c.req.raw));

app.route("/health", healthRoutes);
app.route("/generate", generateRoutes);

app.onError(errorHandler);
