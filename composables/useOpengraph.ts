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
			const img = new Image();
			img.src = svgDataUrl;
			return svgDataUrl;
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
