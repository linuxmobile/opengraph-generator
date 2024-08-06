import { toSvg } from "html-to-image";

export const useOpengraph = () => {
	const [opengraphID, setOpengraphID] = useGlobalGenericState<number>(
		"opengraphID",
		1,
	);
	const [ogImageUrl, setOgImageUrl] = useGlobalGenericState<string | null>(
		"ogImageUrl",
		null,
	);

	const generateImage = async (
		element: HTMLElement,
	): Promise<string | null> => {
		try {
			const svgDataUrl = await toSvg(element);
			const response = await fetch(svgDataUrl);
			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);
			ogImageUrl.value = blobUrl;
			return blobUrl;
		} catch (error: any) {
			console.error("Error generating image", error.message);
			return null;
		}
	};

	return {
		opengraphID,
		setOpengraphID,
		ogImageUrl,
		setOgImageUrl,
		generateImage,
	};
};
