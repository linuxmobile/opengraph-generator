import { serverSupabaseServiceRole } from "#supabase/server";

interface Database {
	public: {
		opengraph_images: OpenGraphImage;
	};
}

type OpenGraphImage = {
	id: number;
	created_at?: string;
	title: string;
	description: string;
	updated_at?: string;
	short_url: string;
	original_url: string;
};

export default defineEventHandler(async (event) => {
	const method = event.node.req.method;
	const supabase = serverSupabaseServiceRole<Database>(event);

	if (!supabase) {
		console.error("Supabase client not initialized");
		return {
			status: 500,
			body: {
				error: "Supabase client not initialized",
			},
		};
	}

	if (method === "GET") {
		const { originalUrl } = getQuery(event);

		if (!originalUrl) {
			return {
				status: 400,
				body: {
					error: "originalUrl is required",
				},
			};
		}

		// Normalize the URL
		let normalizedUrl = originalUrl;
		if (normalizedUrl.endsWith("/")) {
			normalizedUrl = normalizedUrl.slice(0, -1);
		}

		const { data: existingImage, error: fetchError } = await supabase
			.from("opengraph_images")
			.select("*")
			.eq("original_url", normalizedUrl)
			.single();

		if (fetchError && fetchError.code !== "PGRST116") {
			console.error("Error fetching data from Supabase:", fetchError);
			return {
				status: 500,
				body: {
					error: "Failed to fetch OpenGraph image data",
					details: fetchError.message,
				},
			};
		}

		if (existingImage) {
			return {
				statusCode: 200,
				body: existingImage,
			};
		} else {
			return {
				status: 404,
				body: {
					error: "OpenGraph image not found",
				},
			};
		}
	} else if (method === "POST") {
		const body = await readBody(event);
		let { title, description, shortUrl, originalUrl } = body;

		if (!title || !description || !shortUrl || !originalUrl) {
			return {
				status: 400,
				body: {
					error: "title, description, shortUrl, and originalUrl are required",
				},
			};
		}

		// Normalize the URL
		if (
			!originalUrl.startsWith("http://") &&
			!originalUrl.startsWith("https://")
		) {
			originalUrl = `https://${originalUrl}`;
		}

		// Remove trailing slash
		if (originalUrl.endsWith("/")) {
			originalUrl = originalUrl.slice(0, -1);
		}

		// Extract the short URL if it's a full URL
		const shortUrlMatch = shortUrl.match(/\/([^\/]+)$/);
		if (shortUrlMatch) {
			shortUrl = shortUrlMatch[1];
		}

		const { data: existingImage, error: fetchError } = await supabase
			.from("opengraph_images")
			.select("*")
			.eq("short_url", shortUrl)
			.single();

		if (fetchError && fetchError.code !== "PGRST116") {
			console.error("Error fetching data from Supabase:", fetchError);
			return {
				status: 500,
				body: {
					error: "Failed to fetch OpenGraph image data",
					details: fetchError.message,
				},
			};
		}

		if (existingImage) {
			return {
				statusCode: 200,
				body: existingImage,
			};
		}

		const imageData: OpenGraphImage = {
			id: Date.now(),
			title,
			description,
			short_url: shortUrl,
			original_url: originalUrl,
			created_at: new Date().toISOString(),
		};

		const { data, error } = await supabase
			.from("opengraph_images")
			.insert([imageData])
			.select();

		if (error) {
			console.error("Error inserting data into Supabase:", error);
			return {
				status: 500,
				body: {
					error: "Failed to create OpenGraph image",
					details: error.message,
				},
			};
		}

		return {
			statusCode: 200,
			body: data[0],
		};
	} else {
		return {
			status: 405,
			body: {
				error: "Method not allowed",
			},
		};
	}
});
