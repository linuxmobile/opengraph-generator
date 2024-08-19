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
			throw new Error("Image is required for upload");
		}

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
								if (error || !result) {
									reject(new Error("Failed to upload image to Cloudinary"));
								} else {
									resolve(result);
								}
							},
						)
						.end(Buffer.from(image, "base64"));
				},
			);

			return uploadResult.secure_url;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Upload failed: ${error.message}`);
			} else {
				throw new Error("Upload failed");
			}
		}
	};

	return { uploadImage };
};
