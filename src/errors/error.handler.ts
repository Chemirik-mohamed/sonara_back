import axios from "axios";
import type { ErrorHandler } from "hono";

export const errorHandler: ErrorHandler = (err, c) => {
	console.log(err);

	if (axios.isAxiosError(err) && !err.response) {
		return c.json(
			{
				error: "Le service TTS est indisponible",
			},
			502,
		);
	}
	return c.json(
		{
			error: "Une erreur est survenue.",
		},
		500,
	);
};
