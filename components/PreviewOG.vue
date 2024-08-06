<template>
  <div class="w-full h-full min-h-98 relative">
    <div class="w-full absolute z-2 top-4 left-2 text-slate-300 p-4 rounded-b-3xl">
      <button @click="fetchMetadata">
        <Sparkle class="size-7"/>
      </button>
    </div>
    <OpengraphPreview
      :title="title"
      :description="description"
      :author="author"
      :url="url"
      :svg="svg"
      :selectedId="selectedId"
      :isSlider="false"
      :className="'!max-w-full'"
      @updateSelectedId="updateSelectedId"
    />
    <div class="w-full absolute bottom-4 right-2 text-slate-300 p-4 rounded-b-3xl flex justify-end">
      <button @click="emitToggleOptionsPanel">
        <Settings />
      </button>
    </div>
  </div>
</template>

<script setup>
import Sparkle from "~/assets/Sparkle.vue";
import { Settings } from "lucide-vue-next";

const { setMetadata, metadata } = useMetadata();

const props = defineProps({
	title: String,
	description: String,
	author: String,
	url: String,
	svg: String,
	selectedId: Number,
	className: String,
	isOptionsPanelOpen: Boolean,
});

const emit = defineEmits([
	"updateSelectedId",
	"toggleOptionsPanel",
	"metadataUpdate",
]);

async function fetchMetadata() {
	if (!props.url) {
		console.log("URL is not provided");
		return;
	}
	let normalizedUrl = props.url;
	if (
		!normalizedUrl.startsWith("https://") &&
		!normalizedUrl.startsWith("http://")
	) {
		normalizedUrl = "https://" + normalizedUrl;
	}

	if (normalizedUrl.endsWith("/")) {
		normalizedUrl = normalizedUrl.slice(0, -1);
	}

	try {
		const urlResponse = await $fetch(
			`/api/opengraph_images?originalUrl=${encodeURIComponent(normalizedUrl)}`,
			{
				method: "GET",
			},
		);

		const { title, description } = urlResponse.body;
		if (!title || !description) {
			setMetadata(null);
			return;
		}

		setMetadata({ ...metadata.value, title, description });
		emit("metadataUpdate", { title, description });
	} catch (error) {
		console.log("Error fetching metadata", error);
		setMetadata(null);
	}
}

function updateSelectedId(id) {
	emit("updateSelectedId", id);
}

function emitToggleOptionsPanel() {
	emit("toggleOptionsPanel");
}
</script>
