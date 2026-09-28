import axios from "axios";

export async function generateSpeech(text: string) {
	const response = await axios.post(
		"http://127.0.0.1:8000/generate",
		{ text },
		{
			responseType: "arraybuffer",
		},
	);
	return response.data;
}
