import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

if ((import.meta as any).browser) {
	throw new Error("Cloudinary functions can only be used server-side");
}

const config = useRuntimeConfig();

const CLOUD_NAME = config.cloudinaryCloudName;
const API_KEY = config.cloudinaryApiKey;
const API_SECRET = config.cloudinaryApiSecret;

if (CLOUD_NAME === "" || API_KEY === "" || API_SECRET === "") {
	throw new Error("Missing Cloudinary env variables");
}

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET,
});

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

	const base64Formatted = image.replace(/^data:image\/jpeg;base64,/, "");

	const transformationOptions = {
		transformation: [
			{ width: 500, crop: "scale" },
			{ quality: 100 },
			{ fetch_format: "jpg" },
		],
	};

	try {
		const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(
			`data:image/jpeg;base64,${base64Formatted}`,
			{
				folder: "opengraph_images",
				...transformationOptions,
			},
		);

		if (!uploadResult) {
			throw new Error("Something went wrong uploading image to Cloudinary");
		}

		const imageUrl = uploadResult.secure_url;

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
