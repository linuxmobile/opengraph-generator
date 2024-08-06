import { v2 as cloudinary } from "cloudinary";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { image } = body;

	if (!image) {
		return {
			status: 400,
			body: {
				error: "image is required",
			},
		};
	}

	cloudinary.config({
		cloud_name: useRuntimeConfig().cloudinaryCloudName,
		api_key: useRuntimeConfig().cloudinaryApiKey,
		api_secret: useRuntimeConfig().cloudinaryApiSecret,
	});

	try {
		const uploadResponse = await cloudinary.uploader.upload(image, {
			folder: "opengraph_images",
		});

		const imageUrl = uploadResponse.secure_url;

		return {
			statusCode: 200,
			body: { imageUrl },
		};
	} catch (error) {
		console.error("Error uploading to Cloudinary:", error);
		return {
			status: 500,
			body: {
				error: "Failed to upload image to Cloudinary",
				details: error.message,
			},
		};
	}
});
