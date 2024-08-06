<template>
  <main class="relative h-screen w-full flex flex-col-reverse p-5">
    <MetadataOptions v-show="isOptionsPanelOpen" :title="metadata.title" :description="metadata.description"
      @metadata-update="updateMetadata" @toggle-menu="toggleMenu" />
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

const { metadata, setMetadata } = useMetadata();

function updateMetadata(metadata) {
  setMetadata(metadata)
}

const isOptionsPanelOpen = ref(false)

function toggleMenu(v) {
  isOptionsPanelOpen.value = v
}

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
