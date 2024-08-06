<template>
  <p>Redirigiendo...</p>
</template>
<script setup>
const route = useRoute();
const slug = route.params.slug;

const { data, error } = await useAsyncData("fetchUrl", async () => {
	const response = await fetch(`/api/opengraph_images?shortUrl=${slug}`);
	if (!response.ok) {
		throw createError({
			statusCode: response.status,
			message: "Not found",
		});
	}
	return await response.json();
});

if (data.value && data.value.body) {
	const { title, description, og_image_url, original_url } = data.value.body;

	useSeoMeta({
		title,
		description,
		ogTitle: title,
		ogDescription: description,
		ogImage: og_image_url,
		ogUrl: original_url,
		twitterTitle: title,
		twitterDescription: description,
		twitterImage: og_image_url,
		twitterCard: "summary",
	});

	setTimeout(() => {
		location.href = original_url;
	}, 1000);
}
</script>
