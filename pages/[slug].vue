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

if (data.value) {
	useHead({
		title: data.value.title,
		meta: [
			{ name: "description", content: data.value.description },
			{ property: "og:title", content: data.value.title },
			{ property: "og:description", content: data.value.description },
			{ property: "og:image", content: data.value.og_image_url },
			{ property: "og:url", content: data.value.original_url },
		],
	});

	setTimeout(() => {
		window.location.href = data.value.original_url;
	}, 1000);
}
</script>
