import { defineConfig, presetWind } from "unocss";
import { presetAnimations } from "unocss-preset-animations";

export default defineConfig({
	presets: [presetWind(), presetAnimations()],
	theme: {
		fontFamily: {
			sans: "Satoshi",
			boska: "Boska",
			switzer: "Switzer",
			grotesk: "Space Grotesk",
		},
	},
	include: ["./**/*.{ts,jsx,tsx,vue,html}", "./utils/template.ts"],
});
