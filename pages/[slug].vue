<template>
  <p>Redirigiendo...</p>
</template>
<script setup>
const route = useRoute();
const slug = route.params.slug;

console.log("SLUG:", slug);

const { data, error } = await useAsyncData(async () => {
	console.log("STARTING EXTRACTOR...");
	const ogResponse = await $fetch(
		`/api/get-opengraph-data?slug=${encodeURIComponent(slug)}`,
	);

	if (!ogResponse || !ogResponse.body) {
		throw new Error("OpenGraph data not found");
	}

	const { title, description, og_image_url, originalUrl } = ogResponse.body;

	return {
		title,
		description,
		og_image_url,
		originalUrl,
	};
});

if (error.value) {
	console.error("Error fetching data:", error.value);
} else {
	useSeoMeta({
		title: data.value.title,
		description: data.value.description,
		ogTitle: data.value.title,
		ogDescription: data.value.description,
		ogImage: data.value.og_image_url,
		ogUrl: data.value.originalUrl,
		twitterTitle: data.value.title,
		twitterDescription: data.value.description,
		twitterImage: data.value.og_image_url,
		twitterCard: "summary",
		twitterImageHeight: 630,
		twitterImageWidth: 1200,
		ogImageWidth: 1200,
		ogImageHeight: 630,
	});
}
</script>
