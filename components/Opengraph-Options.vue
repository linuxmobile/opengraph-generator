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
      <button @click="handleDownload" class="rounded-full bg-white/10 px-3 py-2">Download</button>
    </div>
  </aside>
  <div class="hidden w-full h-full">
    <OGPreviewComponent ref="hiddenPreviewRef" :template="activeTemplate" :old-metadata="oldMetadata"/>
  </div>
</template>
<script setup>
import { useClipboard } from "@vueuse/core";
import { saveAs } from "file-saver";
const { oldMetadata, metadata } = useMetadata();
const { activeTemplate } = useTemplateStore();
const { generateImage, ogImageUrl } = useGenerateOGImage();
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
			copy(metadata.value.shortUrl);
			notify.success("URL successfully copied to clipboard!");
		} catch (error) {
			notify.error("An error occurred while generating the image!");
		} finally {
			isGenerating.value = false;
		}
	}
};

const handleDownload = async () => {
	if (!ogImageUrl.value && storeRef.domRef) {
		await generateImage(storeRef.domRef);
	}
	if (ogImageUrl.value) {
		const imageBlob = base64ToBlob(ogImageUrl.value);
		saveAs(imageBlob, "opengraph.jpg");
		notify.success("Image successfully downloaded!");
	} else {
		notify.error("No image to download!");
	}
};

function base64ToBlob(base64) {
	const byteCharacters = atob(base64);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	return new Blob([byteArray], { type: "image/jpeg" });
}

onMounted(() => {
	storeRef.domRef = hiddenPreviewRef.value.$el;
});
</script>
