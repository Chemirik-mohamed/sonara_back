import { Hono } from "hono";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { ttsRequestSchema } from "./tts.schema";
import { generateSpeech } from "./tts.service";

export const generateRoutes = new Hono();

generateRoutes.post("/", sessionMiddleware, async (c) => {
	const session = c.get("session");

	if (!session) {
		return c.json(
			{
				error: "Authentification requise.",
			},
			401,
		);
	}

	// console.log(session);

	const textRequest = await c.req.json();
	const parsed = ttsRequestSchema.safeParse(textRequest);

	if (!parsed.success) {
		return c.json(
			{
				error: "Le texte doit contenir entre 1 et 500 caractères.",
			},
			400,
		);
	}

	const audio = await generateSpeech(parsed.data.text);

	return c.body(audio, 200, {
		"Content-Type": "audio/wav",
	});
});
