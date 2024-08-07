<template>
  <p>Redirigiendo...</p>
</template>
<script setup>
const route = useRoute();
const slug = route.params.slug;

const { data, error } = await useAsyncData(async () => {
	const response = await $fetch(`/api/urls?shortUrl=${slug}`);

	if (!response || !response.body.original_url) {
		throw new Error("Original URL not found");
	}

	const originalUrl = response.body.original_url;

	const ogResponse = await $fetch(
		`/api/opengraph_images?originalUrl=${encodeURIComponent(originalUrl)}`,
	);

	const { title, description, og_image_url } = ogResponse.body;

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
	setTimeout(() => {
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
		});
	}, 1000);
}
</script>
