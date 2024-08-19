<template>
  <aside
    v-if="oldMetadata"
    class="md:col-span-4 w-full h-full p-5 bg-white/5 flex flex-col gap-y-8 rounded-xl">
    <div v-if="oldMetadata.title">
      <label for="title" class="text-sm font-medium">Title</label>
      <input
        id="title"
        v-model="oldMetadata.title"
        type="text"
        class="mt-1 w-full px-3 py-2 rounded-md bg-white/10"
      />
    </div>
    <div v-if="oldMetadata.description">
      <label for="description" class="text-sm font-medium">Description</label>
      <textarea
        id="description"
        v-model="oldMetadata.description"
        type="text"
        class="mt-1 w-full px-3 py-2 rounded-md bg-white/10"
      />
    </div>
    <div v-if="oldMetadata.url">
      <label for="url" class="text-sm font-medium">URL</label>
      <input
        id="url"
        v-model="oldMetadata.url"
        type="text"
        class="mt-1 w-full px-3 py-2 rounded-md bg-white/10"
      />
    </div>
    <div v-if="oldMetadata.author">
      <label for="author" class="text-sm font-medium">Author</label>
      <input
        id="author"
        v-model="oldMetadata.author"
        type="text"
        class="mt-1 w-full px-3 py-2 rounded-md bg-white/10"
      />
    </div>
    <div class="flex w-full items-center justify-end gap-x-6">
      <button :disabled="isGenerating" @click="generate" class="rounded-full bg-white/10 px-3 py-2">Generate Opengraph</button>
      <button class="rounded-full bg-white/10 px-3 py-2">Download</button>
    </div>
  </aside>
  <div class="hidden w-full h-full">
    <OGPreviewComponent ref="hiddenPreviewRef" :template="activeTemplate" :old-metadata="oldMetadata"/>
  </div>
</template>
<script setup>
import { useClipboard } from "@vueuse/core";
const { oldMetadata, metadata } = useMetadata();
const { activeTemplate } = useTemplateStore();
const { generateImage } = useGenerateOGImage();
const { storeRef } = useTemplateRefState();
const isGenerating = ref(false);

const source = ref("");
const { copy } = useClipboard({ source });

const hiddenPreviewRef = ref(null);

const generate = async () => {
	if (storeRef.domRef) {
		isGenerating.value = true;
		try {
			const image = await generateImage(storeRef.domRef);
			await $fetch("/api/process-url", {
				method: "POST",
				body: JSON.stringify({ url: oldMetadata.value.url, image }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			// TODO: add a toast message
			copy(metadata.value.shortUrl);
		} catch (error) {
			console.error("Error uploading image:", error);
		} finally {
			isGenerating.value = false;
		}
	}
};

onMounted(() => {
	storeRef.domRef = hiddenPreviewRef.value.$el;
});
</script>
