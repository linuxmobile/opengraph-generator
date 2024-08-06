<template>
  <main class="relative h-screen w-full flex flex-col-reverse p-5 overflow-auto">
    <div class="relative h-screen w-full flex flex-col-reverse p-5 overflow-auto md:flex-col">
      <MetadataOptions
        v-show="isOptionsPanelOpen"
        v-bind="metadata"
        @metadata-update="updateMetadata"
        @toggle-menu="toggleMenu"
      />
      <div class="w-full flex items-center justify-between gap-x-5">
        <button class="w-full rounded-lg py-2 bg-white/5">Generate Shareable Link</button>
        <button class="w-full rounded-lg py-2 bg-white/5">Edit</button>
      </div>
      <SliderPreviewOg
        :title="metadata.title"
        :description="metadata.description"
        :author="metadata.author"
        :url="metadata.url"
        :svg="absoluteFaviconUrl"
        :selectedId="selectedId"
        @updateSelectedId="updateSelectedId"
      />
      <PreviewOG
        :title="metadata.title"
        :description="metadata.description"
        :author="metadata.author"
        :url="metadata.url"
        :svg="absoluteFaviconUrl"
        :selectedId="selectedId"
        @updateSelectedId="updateSelectedId"
        @toggleOptionsPanel="toggleOptionsPanel"
      />
    </div>
    <div class="w-full flex items-center justify-between">
      <Logo class="flex items-center w-full justify-start pb-3" :text="'!text-6xl'" :icon="'!size-4.5'" />
      <NuxtLink target="_blank" :href="'https://github.com/linuxmobile/opengraph-generator'"
        class="rounded-full p-2 bg-white/10 flex gap-x-2 group">
        <p class="group-hover:block hidden pr-1 text-nowrap">Give a Star!</p>
        <Github class="size-6"/>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import Github from "~/assets/Github.vue";

const { metadata, setMetadata } = useMetadata();

function updateMetadata(newMetadata) {
	setMetadata({
		...metadata.value,
		...newMetadata,
	});
}

const isOptionsPanelOpen = ref(false);
const selectedId = ref(1);

function toggleMenu(v) {
	isOptionsPanelOpen.value = v;
}

function updateSelectedId(id) {
	selectedId.value = id;
}

function toggleOptionsPanel() {
	isOptionsPanelOpen.value = !isOptionsPanelOpen.value;
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
