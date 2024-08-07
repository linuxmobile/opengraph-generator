<template>
  <main class="relative h-screen w-full flex flex-col-reverse p-5 overflow-auto">
    <div class="relative h-screen w-full flex flex-col-reverse p-5 overflow-auto md:flex-col">
      <MetadataOptions
        v-show="isOptionsPanelOpen"
        v-bind="metadata"
        @metadata-update="updateMetadata"
        @toggle-menu="toggleMenu"
      />
      <div class="w-full flex items-center justify-between gap-x-5 pt-5">
        <button
          class="w-full rounded-lg py-2 bg-white/5"
          @click="generateShareableLink"
        >Generate Shareable Link</button>
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
import { toJpeg } from "html-to-image";

const { metadata, setMetadata } = useMetadata();
const { ogImageUrl } = useOpengraph();

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

async function generateShareableLink() {
	try {
		const image = ogImageUrl.value;
		if (!image) {
			return;
		}

		const jpegImage = await convertSvgToJpeg(image);

		const data = await $fetch("/api/upload", {
			method: "POST",
			body: { image: jpegImage },
		});

		if (data && data.body.imageUrl) {
			const imageUrl = data.body.imageUrl;
			console.log("Image uploaded successfully:", imageUrl);
		} else {
			throw new Error("Image URL not found in response");
		}
	} catch (error) {
		console.error("Error generating shareable link:", error);
	}
}

async function convertSvgToJpeg(svgUrl) {
	const response = await fetch(svgUrl, {
		mode: "cors",
		credentials: "include",
	});
	const svgText = await response.text();
	const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
	const svgUrlBlob = URL.createObjectURL(svgBlob);

	const img = new Image();
	img.crossOrigin = "anonymous";
	img.src = svgUrlBlob;

	return new Promise((resolve, reject) => {
		img.onload = async () => {
			const svgElement = document.createElement("div");
			svgElement.innerHTML = svgText;
			document.body.appendChild(svgElement);

			try {
				const jpegUrl = await toJpeg(svgElement, { quality: 0.8 });
				document.body.removeChild(svgElement);
				resolve(jpegUrl);
			} catch (error) {
				document.body.removeChild(svgElement);
				reject(error);
			}
		};
		img.onerror = (error) => reject(error);
	});
}
</script>
