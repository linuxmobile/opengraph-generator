import { serverSupabaseServiceRole } from "#supabase/server";
import { type Database } from "~/types/database.types";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	if (event.method !== "GET") {
		return {
			status: 405,
			body: {
				error: "Method not allowed",
			},
		};
	}

	const baseUrl = config.public.baseUrl || "http//localhost";

	const url = event.node.req.url ? new URL(event.node.req.url, baseUrl) : null;
	const slug = url ? url.searchParams.get("slug") : null;

	if (!slug) {
		return {
			status: 400,
			body: {
				error: "Slug is required",
			},
		};
	}

	const supabase = serverSupabaseServiceRole<Database>(event);

	const { data: ogData, error } = await supabase
		.from("opengraph_images")
		.select("og_image_url, title, description, original_url")
		.eq("short_url", slug)
		.single();

	if (error) {
		console.error("Error fetching OpenGraph data:", error.message);
		return {
			status: 500,
			body: {
				error: error.message,
			},
		};
	}

	return {
		status: 200,
		body: ogData,
	};
});
