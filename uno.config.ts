import { defineConfig, presetWind } from "unocss";

export default defineConfig({
	presets: [presetWind()],
	safelist: [
		"font-bold",
		"font-extrabold",
		"font-extralight",
		"font-light",
		"font-medium",
		"font-normal",
		"font-semibold",
		"font-thin",
		"text-2xl",
		"text-3xl",
		"text-lg",
		"text-md",
		"text-sm",
		"text-xl",
		"text-xs",
		"italic",
		"size-7",
		"absolute",
		"top-4",
		"right-5",
	],
	theme: {
		fontFamily: { boska: "Boska", sans: "Switzer" },
	},
});
