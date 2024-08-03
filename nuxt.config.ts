// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },

	runtimeConfig: {
		baseUrl: process.env.BASE_URL || "http://localhost:3000",
		apiKey: process.env.GOOGLE,
	},
	css: ["@unocss/reset/tailwind.css"],
	modules: ["@unocss/nuxt", "nuxt-lucide-icons"],
});
