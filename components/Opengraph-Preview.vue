<template>
  <div class="grow my-12 w-full aspect-1.9 relative">
    <div class="w-full absolute z-2 bottom-0 left-0 text-slate-300 p-4 rounded-b-3xl">
      <button @click="handleGenerateWithAI" class="rounded-full p-2 bg-black/70 backdrop-blur-sm flex gap-x-2 group">
        <Sparkle class="size-6"/>
        <p class="group-hover:block hidden pr-1">Generate w/ AI</p>
      </button>
    </div>
    <div
      v-if="activeTemplate"
      :class="activeTemplate.background"
      class="relative w-full h-auto flex aspect-video flex-col gap-y-3 items-center justify-center p-6 rounded-3xl">
      <p :class="activeTemplate.title.sm" v-if="metadata.title">{{ currentTitle }}</p>
      <p :class="activeTemplate.description.sm" v-if="metadata.description">{{ currentDescription }}</p>
      <p :class="activeTemplate.url.sm" v-if="metadata.url">{{ metadata.url }}</p>
      <p :class="activeTemplate.author.sm" v-if="metadata.author">{{ metadata.author }}</p>
      <img
        :class="activeTemplate.svg.sm"
        v-if="metadata.favicon"
        :src="getFaviconUrl(metadata.favicon)" alt="Favicon"
        class="aspect-auto">
    </div>
  </div>
  <div class="w-full flex items-center justify-start gap-x-6">
    <button
      v-for="template in templates[selectedCategory]"
      :key="template.id"
      @click="setActiveTemplate(template.id)"
      class="px-4 py-2 rounded-full bg-white/20 text-xl">
      Template {{ template.id }}
    </button>
  </div>
</template>
<script setup>
import { useLocalStorage } from "@vueuse/core";
import { templates } from "~/utils/templates";
import { normalizeUrl } from "~/utils/normalizeUrl";
import Sparkle from "~/assets/Sparkle.vue";

const { oldMetadata, metadata } = useMetadata();
const { selectedCategory, activeTemplate, setActiveTemplate } =
	useTemplateStore();

const generatedWithAI = ref(false);

const handleGenerateWithAI = () => {
	generatedWithAI.value = true;
};

const getFaviconUrl = (favicon) => {
	const baseurl = normalizeUrl(oldMetadata.value.url || "");
	return `${baseurl}${favicon}`;
};

const activeTemplateStorage = useLocalStorage("activeTemplate", activeTemplate);
const oldMetadataStorage = useLocalStorage("oldMetadata", oldMetadata);
const metadataStorage = useLocalStorage("metadata", metadata);

watch(activeTemplate, (newVal) => {
	activeTemplateStorage.value = newVal;
});
watch(oldMetadata, (newVal) => {
	oldMetadataStorage.value = newVal;
});
watch(metadata, (newVal) => {
	metadataStorage.value = newVal;
});

const currentTitle = computed(() => {
	return generatedWithAI.value ? metadata.value.title : oldMetadata.value.title;
});

const currentDescription = computed(() => {
	return generatedWithAI.value
		? metadata.value.description
		: oldMetadata.value.description;
});
</script>
