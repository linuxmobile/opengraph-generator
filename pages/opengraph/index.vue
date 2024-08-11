<template>
	<main class="relative h-screen flex flex-col-reverse p-5 overflow-auto transition-all"
		:class="{ 'ml-[24rem]': !isSmallScreen && isOptionsPanelOpen }">
		<div class="relative h-screen w-full flex flex-col-reverse p-5 overflow-auto md:flex-col">
			<MetadataOptions
			  v-show="isOptionsPanelOpen"
				v-bind="metadata"
				@metadata-update="updateMetadata"
				@toggle-menu="toggleMenu" />
			<SliderPreviewOg
        :title="metadata.title"
        :description="metadata.description"
        :author="metadata.author"
        :url="metadata.url"
        :svg="absoluteFaviconUrl"
        :selectedId="selectedId"
        @updateSelectedId="updateSelectedId"
        @metadataUpdate="handleMetadataUpdate"
        @updateOldMetadata="handleUpdateOldMetadata" />
			<PreviewOG
			  :title="metadata.title"
				:description="metadata.description"
				:author="metadata.author"
				:url="metadata.url"
				:svg="absoluteFaviconUrl"
				:selectedId="selectedId"
				@updateSelectedId="updateSelectedId"
				@toggleOptionsPanel="toggleOptionsPanel"
				@metadataUpdate="handleMetadataUpdate"
				@updateOldMetadata="handleUpdateOldMetadata" />
		</div>
		<div class="w-full flex items-center justify-between">
			<Logo
			  class="flex items-center w-full justify-start pb-3"
			  :text="'!text-6xl'"
				:icon="'!size-4.5'" />
			<NuxtLink
			  target="_blank"
				:href="'https://github.com/linuxmobile/opengraph-generator'"
				class="rounded-full p-2 bg-white/10 flex gap-x-2 group">
				<p class="group-hover:block hidden pr-1 text-nowrap">Give a Star!</p>
				<Github class="size-6" />
			</NuxtLink>
		</div>
	</main>
</template>
<script setup>
import Github from "~/assets/Github.vue";
import { SMALL_SCREEN_MAX_WIDTH } from "~/constants";
import { getAbsoluteFaviconUrl } from "~/utils/getAbsoluteFaviconUrl";

const { metadata, setMetadata, oldMetadata, setOldMetadata } = useMetadata();
const { ogImageUrl } = useOpengraphImage();
const isSmallScreen = useMediaQuery(`(max-width: ${SMALL_SCREEN_MAX_WIDTH})`);

function updateMetadata(newMetadata) {
	setMetadata({
		...metadata.value,
		title: newMetadata.title,
		description: newMetadata.description,
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

function updateOldMetadata(newMetadata) {
	setOldMetadata(newMetadata);
}

function handleMetadataUpdate(newMetadata) {
	updateMetadata(newMetadata);
}

function handleUpdateOldMetadata(newOldMetadata) {
	updateOldMetadata(newOldMetadata);
}

const absoluteFaviconUrl = computed(() =>
	getAbsoluteFaviconUrl(metadata.value),
);

async function generateShareableLink() {}
</script>
