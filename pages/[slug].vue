<template>
  <p>Redirigiendo...</p>
</template>
<script setup>
import { serverSupabaseServiceRole } from "#supabase/server";

const route = useRoute();
const slug = route.params.slug;

const { data, error } = await useAsyncData("fetchUrl", async () => {
	const supabase = serverSupabaseServiceRole();
	const { data, error } = await supabase
		.from("opengraph_images")
		.select("original_url, og_image_url, title, description")
		.eq("short_url", slug)
		.single();
	if (error || !data) {
		throw createError({
			statusCode: 404,
			message: "Not found",
		});
	}

	return data;
});

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
</script>
