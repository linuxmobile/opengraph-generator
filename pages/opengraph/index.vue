<template>
  <main class="relative h-screen w-full flex flex-col-reverse p-5">
    <SliderPreviewOg
    :title="metadata.title"
    :description="metadata.description"
    :author="metadata.author"
    :url="metadata.url"
    :svg="absoluteFaviconUrl"
    />
    <PreviewOG
      :title="metadata.title"
      :description="metadata.description"
      :author="metadata.author"
      :url="metadata.url"
    />
  </main>
</template>
<script setup>
import SliderPreviewOg from "~/components/SliderPreviewOg.vue";

const { metadata } = useMetadata();

const absoluteFaviconUrl = computed(() => {
	if (!metadata.value.favicon) return null;
	const baseUrl = metadata.value.url.endsWith("/")
		? metadata.value.url.slice(0, -1)
		: metadata.value.url;
	const faviconPath = metadata.value.favicon.startsWith("/")
		? metadata.value.favicon.slice(1)
		: metadata.value.favicon;
	return metadata.value.favicon.startsWith("http")
		? metadata.value.favicon
		: `${baseUrl}/${faviconPath}`;
});
</script>
