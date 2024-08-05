import { toJpeg, toSvg } from "html-to-image";
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
			const svgDataUrl = await toSvg(element);
			const img = new Image();
			img.src = svgDataUrl;

			img.onload = () => {
				const canvas = document.createElement("canvas");
				const context = canvas.getContext("2d");

				if (!context) {
					throw new Error("No se pudo obtener el contexto 2D del canvas");
				}

				canvas.width = 1200;
				canvas.height = 630;
				context.drawImage(img, 0, 0, 1200, 630);
				const pngDataUrl = canvas.toDataURL("image/png");
				setOgImageUrl(pngDataUrl);
			};
		} catch (error: any) {
			console.error("Error generating image", error.message);
		}
	};

	return { opengraphID, setOpengraphID, ogImageUrl, generateImage };
};
