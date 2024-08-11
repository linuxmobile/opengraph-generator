import { serverSupabaseServiceRole } from "#supabase/server";
import { type Database } from "~/types/database.types";

export const useUrlsService = () => {
	const createShortUrl = async (
		event: any,
		originalUrl: string,
		isAnonymous: boolean,
	) => {
		const supabase = serverSupabaseServiceRole<Database>(event);
		if (!supabase) throw new Error("Supabase client not initialized");

		const { data: existingUrl, error: fetchError } = await supabase
			.from("urls")
			.select("*")
			.eq("original_url", originalUrl)
			.single();

		if (fetchError && fetchError.code !== "PGRST116")
			throw new Error(fetchError.message);

		if (existingUrl) {
			const baseUrl =
				process.env.NODE_ENV === "development"
					? "http://localhost:3000"
					: process.env.BASE_URL;
			return `${baseUrl}/${existingUrl.short_url}`;
		}

		const shortUrl = Math.random().toString(36).substring(2, 8);
		const urlData = {
			id: Date.now(),
			original_url: originalUrl,
			short_url: shortUrl,
			is_anonymous: isAnonymous ?? true,
			created_at: new Date().toISOString(),
		};

		const { data, error } = await supabase
			.from("urls")
			.insert([urlData])
			.select();
		if (error) throw new Error(error.message);

		const baseUrl =
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: process.env.BASE_URL;
		return `${baseUrl}/${shortUrl}`;
	};

	const checkUrlExists = async (originalUrl: string) => {
		const supabase = serverSupabaseServiceRole<Database>(event);
		if (!supabase) throw new Error("Supabase client not initialized");

		const { data: existingUrl, error: fetchError } = await supabase
			.from("urls")
			.select("*")
			.eq("original_url", originalUrl)
			.single();

		if (fetchError && fetchError.code !== "PGRST116")
			throw new Error(fetchError.message);

		return existingUrl;
	};

	return { createShortUrl, checkUrlExists };
};
