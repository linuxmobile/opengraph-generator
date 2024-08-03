import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event);
	const { slug } = event.context.params as Record<string, string>;

	const { data, error } = await supabase
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

	return sendRedirect(event, data.original_url, 302);
});
