import { toJpeg } from "@intuiface/html-to-image";
import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

export const useGenerateOGImage = () => {
	const [ogImageUrl, setOgImageUrl] = useGlobalGenericState<string | null>(
		"ogImageUrl",
		null,
	);

	const generateImage = async (
		element: HTMLElement,
	): Promise<string | null> => {
		try {
			const dataUrl = await toJpeg(element, {
				height: 630,
				width: 1200,
			});
			const base64Image = dataUrl.split(",")[1];
			setOgImageUrl(base64Image);
			return base64Image;
		} catch (error: any) {
			console.error("Error generating image", error.message);
			return null;
		}
	};

	return {
		ogImageUrl,
		setOgImageUrl,
		generateImage,
	};
};
