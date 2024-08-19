<template>
  <div
    v-if="activeTemplate"
    class="min-w-[1200px] min-h-[630px] max-w-[1200px] max-h-[630px]">
    <div
      v-if="domReady"
      ref="domRef"
      :class="activeTemplate.background"
      class="relative w-full h-full flex flex-col gap-y-3 items-center justify-center p-6 rounded-3xl md:px-10 md:gap-y-6">
      <p :class="activeTemplate.title.md" v-if="oldMetadata.title">{{ oldMetadata.title }}</p>
      <p :class="activeTemplate.description.md">{{ oldMetadata.description }}</p>
      <p :class="activeTemplate.url.md" v-if="oldMetadata.url">{{ oldMetadata.url }}</p>
      <p :class="activeTemplate.author.md" v-if="oldMetadata.author">{{ oldMetadata.author }}</p>
      <img
        :class="activeTemplate.svg.md"
        v-if="oldMetadata.favicon"
        :src="getFaviconUrl(oldMetadata.favicon)" alt="Favicon"
        class="aspect-auto">
    </div>
  </div>
</template>
<script setup>
const { storeRef } = useTemplateRefState();
const domReady = ref(false);

const getFaviconUrl = (favicon) => {
	const baseurl = normalizeUrl(oldMetadata.value.url || "");
	return `${baseurl}${favicon}`;
};

const props = defineProps({
	template: Object,
	oldMetadata: Object,
});

const activeTemplate = ref(props.template || {});
const oldMetadata = ref(props.oldMetadata || {});

const domRef = ref(null);
onMounted(() => {
	storeRef.domRef = domRef.value;
	domReady.value = true;
});

watchEffect(() => {
	activeTemplate.value = props.template;
	oldMetadata.value = props.oldMetadata;
});
</script>
