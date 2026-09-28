import { z } from "zod";

export const ttsRequestSchema = z.object({
	text: z.string().trim().min(1).max(500),
});
