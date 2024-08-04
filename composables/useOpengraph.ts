import { toJpeg } from "html-to-image";
import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

export const useOpengraph = () => {
	const [opengraphID, setOpengraphID] = useGlobalGenericState<number>(
		"opengraphID",
		1,
	);
	const [ogImageUrl, setOgImageUrl] = useGlobalGenericState<string | null>(
		"ogImageUrl",
		null,
	);

	const generateImage = async (element: HTMLElement) => {
		try {
			const dataUrl = await toJpeg(element, {
				quality: 0.95,
				height: 630,
				width: 1200,
				canvasHeight: 315,
				canvasWidth: 600,
			});
			setOgImageUrl(dataUrl);
		} catch (error: any) {
			console.error("Error generating image", error.message);
		}
	};

	return { opengraphID, setOpengraphID, ogImageUrl, generateImage };
};
