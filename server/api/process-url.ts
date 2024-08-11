import { useGenerateAI } from "~/composables/useGenerateAI";
import { useMetadataService } from "~/composables/metadataService";
import { useOpenGraphService } from "~/composables/useOpengraphService";
import { useUploadService } from "~/composables/useUploadService";
import { useUrlsService } from "~/composables/useUrlsService";

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

		const shortUrl = await createShortUrl(event, url, true);
		const shortUrlSlug = shortUrl?.split("/").pop() || "";

		const metadata = await extractMetadata(url);

		if (metadata) {
			const existingOGData = await getOpenGraphData(url);

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
					originalUrl: url,
				});
			}

			if (image) {
				const uploadedImage = await uploadImage(image);
				await updateOpengraphData(url, uploadedImage);
			}

			return {
				status: 200,
				body: {
					oldMetadata: metadata,
					metadata: {
						...metadata,
						title: generatedTitle,
						description: generatedDescription,
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
