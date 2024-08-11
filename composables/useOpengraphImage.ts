import { toSvg } from "html-to-image";

export const useOpengraphImage = () => {
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
			const svgDataUrl = await toSvg(element, {
				height: 315,
				width: 600,
			});
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
