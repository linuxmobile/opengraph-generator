import { serverSupabaseServiceRole } from "#supabase/server";
import { type Database } from "~/types/database.types";

export const useOpenGraphService = (event: any) => {
	const supabase = serverSupabaseServiceRole<Database>(event);

	const getOpenGraphData = async (originalUrl: string) => {
		if (!supabase) {
			console.error("Supabase client not initialized");
			throw new Error("Supabase client not initialized");
		}

		const { data: existingImage, error: fetchError } = await supabase
			.from("opengraph_images")
			.select("*")
			.eq("original_url", originalUrl)
			.single();

		if (fetchError && fetchError.code !== "PGRST116") {
			console.error("Error fetching OpenGraph data:", fetchError.message);
			throw new Error(fetchError.message);
		}

		return existingImage;
	};

	const createOpenGraphData = async (data: {
		title: string;
		description: string;
		shortUrl: string;
		originalUrl: string;
	}) => {
		if (!supabase) {
			console.error("Supabase client not initialized");
			throw new Error("Supabase client not initialized");
		}

		const imageData = {
			id: Date.now(),
			title: data.title,
			description: data.description,
			short_url: data.shortUrl,
			original_url: data.originalUrl,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		const { data: insertedData, error } = await supabase
			.from("opengraph_images")
			.insert([imageData])
			.select()
			.single();
		if (error) {
			console.error("Error inserting OpenGraph data:", error.message);
			throw new Error(error.message);
		}

		return insertedData;
	};

	const updateOpengraphData = async (
		originalUrl: string,
		ogImageUrl: string,
	) => {
		if (!supabase) {
			console.error("Supabase client not initialized");
			throw new Error("Supabase client not initialized");
		}

		const { data, error } = await supabase
			.from("opengraph_images")
			.update({
				og_image_url: ogImageUrl,
				updated_at: new Date().toISOString(),
			})
			.eq("original_url", originalUrl)
			.single();

		if (error) {
			console.error("Error updating OpenGraph data:", error.message);
			throw new Error(error.message);
		}

		return data;
	};

	return { getOpenGraphData, createOpenGraphData, updateOpengraphData };
};
