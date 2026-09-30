import { z } from "zod";

export const ttsRequestSchema = z.object({
	text: z.string().trim().min(1).max(500),
	language: z.enum(["fr", "en"]),
});
