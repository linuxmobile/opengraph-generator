import { request } from "undici";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const url = query.url;

	if (typeof url !== "string") {
		return { valid: false, message: "Invalid URL parameter" };
	}

	try {
		const { statusCode } = await request(url, { method: "HEAD" });
		return { valid: statusCode >= 200 && statusCode < 400 };
	} catch (error) {
		return { valid: false, message: "Fetch error" };
	}
});
