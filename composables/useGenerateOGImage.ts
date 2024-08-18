import { toPng } from "@intuiface/html-to-image";
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
			const svgDataUrl = await toPng(element, {
				height: 630,
				width: 1200,
			});
			const response = await fetch(svgDataUrl);
			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);
			setOgImageUrl(blobUrl);
			return blobUrl;
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
