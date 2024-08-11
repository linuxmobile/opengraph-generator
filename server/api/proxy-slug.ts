import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const apiSecretToken = event.node.req.headers["x-api-secret"];

	if (apiSecretToken !== config.private.apiSecretToken) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized",
		});
	}
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

	return {
		original_url: data.original_url,
	};
});
