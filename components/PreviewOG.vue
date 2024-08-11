<template>
  <div class="w-full h-fit relative max-w-full">
    <div class="w-full absolute z-2 top-2 -left-2 text-slate-300 p-4 rounded-b-3xl">
      <button @click="handleGenerateWithAI" class="rounded-full p-2 bg-white/10 flex gap-x-2 group">
        <Sparkle class="size-6"/>
        <p class="group-hover:block hidden pr-1">Generate w/ AI</p>
      </button>
    </div>
    <OpengraphPreview
      :title="sessionTitle"
      :description="sessionDescription ? sessionDescription : undefined"
      :author="author"
      :url="url ? url : undefined"
      :svg="svg ? svg : undefined"
      :selectedId="selectedId"
      :isSlider="false"
      :className="'pointer-events-none'"
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

const { metadata, oldMetadata } = useMetadata();

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
	"updateOldMetadata",
]);

const sessionTitle = ref(props.title);
const sessionDescription = ref(props.description);

function updateMetadataFromOldMetadata() {
	if (oldMetadata.value) {
		sessionTitle.value = oldMetadata.value.title;
		sessionDescription.value = oldMetadata.value.description;
	}
}

function updateMetadataFromProps() {
	if (metadata.value) {
		sessionTitle.value = metadata.value.title;
		sessionDescription.value = metadata.value.description;
		emit("updateOldMetadata", metadata.value);
	}
}

function updateSelectedId(id) {
	emit("updateSelectedId", id);
}

function emitToggleOptionsPanel() {
	emit("toggleOptionsPanel");
}

function handleGenerateWithAI() {
	updateMetadataFromProps();
	emit("metadataUpdate", metadata.value);
	emit("updateOldMetadata", metadata.value);
}
updateMetadataFromOldMetadata();
</script>
