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

export const useUploadService = () => {
	const uploadImage = async (image: string) => {
		if (!image) {
			throw new Error("image is required");
		}

		const base64Formatted = image.replace(/^data:image\/jpeg;base64,/, "");

		const transformationOptions = {
			transformation: [{ quality: 100 }, { fetch_format: "jpg" }],
		};

		try {
			const uploadResult: UploadApiResponse = await new Promise(
				(resolve, reject) => {
					cloudinary.uploader
						.upload_stream(
							{
								folder: "opengraph_images",
								...transformationOptions,
							},
							(error, result) => {
								if (error) reject(error);
								else resolve(result);
							},
						)
						.end(Buffer.from(base64Formatted, "base64"));
				},
			);

			if (!uploadResult) {
				throw new Error("Something went wrong uploading image to Cloudinary");
			}

			return uploadResult.secure_url;
		} catch (error) {
			console.error("Error uploading to Cloudinary:", error);
			throw new Error("Failed to upload image to Cloudinary");
		}
	};

	return { uploadImage };
};
