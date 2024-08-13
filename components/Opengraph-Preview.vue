<template>
  <div class="grow my-12">
    <div
      :class="activeTemplate.background"
      class="relative w-full h-auto flex aspect-video flex-col items-center justify-center p-6 rounded-3xl">
      <h1 :class="activeTemplate.title" v-if="metadata.title">{{ metadata.title }}</h1>
      <p :class="activeTemplate.description">{{ metadata.description }}</p>
      <p :class="activeTemplate.url" v-if="metadata.url">{{ metadata.url }}</p>
      <p :class="activeTemplate.author" v-if="metadata.author">{{ metadata.author }}</p>
      <img
        v-if="metadata.favicon"
        :src="getFaviconUrl(metadata.favicon)" alt="Favicon"
        class="size-8 aspect-auto">
    </div>
  </div>
  <div class="slider">
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
import { templates } from "~/utils/templates";
import { normalizeUrl } from "~/utils/normalizeUrl";
const { metadata } = useMetadata();
const { selectedCategory, activeTemplate, setActiveTemplate } =
	useTemplateStore();

const getFaviconUrl = (favicon) => {
	const baseurl = normalizeUrl(metadata.value.url || "");
	return `${baseurl}${favicon}`;
};

getFaviconUrl();
</script>
