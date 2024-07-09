// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },

    runtimeConfig: {
		openaiApiKey: process.env.OPENAI_API_KEY,
	},

    modules: ["@unocss/nuxt"]
});