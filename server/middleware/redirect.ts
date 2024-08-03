import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const path = event.node.req.url || "";
	const slug = path.split("/")[1];

	if (!slug || slug.startsWith("api")) {
		return;
	}

	const supabase = serverSupabaseServiceRole(event);

	const { data, error }: { data: any, error: any } = await supabase
		.from("urls")
		.select("original_url")
		.eq("short_url", slug)
		.single();

	if (error || !data) {
		throw createError({
			statusCode: 404,
			statusMessage: "URL not found",
		});
	}

	const originalUrl = data.original_url.startsWith("http")
		? data.original_url
		: `http://${data.original_url}`;

	return sendRedirect(event, originalUrl, 302);
});
