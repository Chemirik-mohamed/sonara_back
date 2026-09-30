import axios from "axios";

export async function generateSpeech(text: string, language: "fr" | "en") {
	const response = await axios.post(
		"http://127.0.0.1:8000/generate",
		{ text, language },
		{
			responseType: "arraybuffer",
		},
	);
	return response.data;
}
