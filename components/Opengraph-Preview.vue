<template>
  <div class="grow my-12">
    <div
      :class="activeTemplate.background"
      class="relative w-full h-auto flex aspect-video flex-col gap-y-3 items-center justify-center p-6 rounded-3xl">
      <p :class="activeTemplate.title.sm" v-if="oldMetadata.title">{{ oldMetadata.title }}</p>
      <p :class="activeTemplate.description.sm">{{ oldMetadata.description }}</p>
      <p :class="activeTemplate.url.sm" v-if="oldMetadata.url">{{ oldMetadata.url }}</p>
      <p :class="activeTemplate.author.sm" v-if="oldMetadata.author">{{ oldMetadata.author }}</p>
      <img
        :class="activeTemplate.svg.sm"
        v-if="oldMetadata.favicon"
        :src="getFaviconUrl(oldMetadata.favicon)" alt="Favicon"
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

const { oldMetadata } = useMetadata();
const { selectedCategory, activeTemplate, setActiveTemplate } =
	useTemplateStore();

const getFaviconUrl = (favicon) => {
	const baseurl = normalizeUrl(oldMetadata.value.url || "");
	return `${baseurl}${favicon}`;
};

const activeTemplateStorage = useLocalStorage("activeTemplate", activeTemplate);
const oldMetadataStorage = useLocalStorage("oldMetadata", oldMetadata);

watch(activeTemplate, (newVal) => {
	activeTemplateStorage.value = newVal;
});
watch(oldMetadata, (newVal) => {
	oldMetadataStorage.value = newVal;
});
</script>
