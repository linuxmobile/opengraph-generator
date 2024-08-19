import { useGenerateAI } from "~/composables/useGenerateAI";
import { useMetadataService } from "~/composables/metadataService";
import { useOpenGraphService } from "~/composables/useOpengraphService";
import { useUploadService } from "~/composables/useUploadService";
import { useUrlsService } from "~/composables/useUrlsService";
import { normalizeUrl } from "~/utils/normalizeUrl";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { url, image } = body;

	if (!url) {
		return {
			status: 400,
			body: {
				error: "URL is required",
			},
		};
	}

	try {
		const { createShortUrl } = useUrlsService();
		const { extractMetadata } = useMetadataService();
		const { uploadImage } = useUploadService();
		const { getOpenGraphData, createOpenGraphData, updateOpengraphData } =
			useOpenGraphService(event);

		let normalizedUrl = normalizeUrl(url);
		const shortUrl = await createShortUrl(event, normalizedUrl, true);
		const shortUrlSlug = shortUrl?.split("/").pop() || "";

		const metadata = await extractMetadata(normalizedUrl);

		if (metadata) {
			const existingOGData = await getOpenGraphData(normalizedUrl);

			let generatedTitle, generatedDescription;

			if (existingOGData?.title && existingOGData?.description) {
				generatedTitle = existingOGData.title;
				generatedDescription = existingOGData.description;
			} else {
				const generatedData = await useGenerateAI(metadata);
				generatedTitle = generatedData.generatedTitle;
				generatedDescription = generatedData.generatedDescription;

				await createOpenGraphData({
					title: generatedTitle,
					description: generatedDescription,
					shortUrl: shortUrlSlug,
					originalUrl: normalizedUrl,
				});
			}

			if (image) {
				const uploadedImage = await uploadImage(image);
				await updateOpengraphData(normalizedUrl, uploadedImage);
				metadata.og_image_url = uploadedImage;
			}

			return {
				status: 200,
				body: {
					oldMetadata: metadata,
					metadata: {
						...metadata,
						title: generatedTitle,
						description: generatedDescription,
						shortUrl: shortUrl,
						og_image_url: metadata.og_image_url,
					},
				},
			};
		} else {
			return {
				status: 500,
				body: {
					error: "Failed to extract metadata",
				},
			};
		}
	} catch (error) {
		console.error("Error processing URL:", (error as Error).message);
		return {
			status: 500,
			body: {
				error: (error as Error).message,
			},
		};
	}
});
