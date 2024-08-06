<template>
  <!-- <section v-if="ogImageUrl" class="w-full max-w-full relative">
    <img :src="ogImageUrl" alt="Generated Image" />
    <div class="w-full absolute text-slate-300 bottom-0 p-4 rounded-b-3xl flex justify-end">
      <button @click="toggleOptionsPanel">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>
  </section> -->
  <SliderPreviewOg
    v-if="opengraphID"
    :title="title"
    :description="description"
    :author="author"
    :url="url"
    :svg="svg"
    :selectedId="opengraphID"
  />
</template>

<script setup>
import styles from "~/assets/styles.json";
import SliderPreviewOg from "./SliderPreviewOg.vue"; // Importa el componente

const props = defineProps({
	title: String,
	description: String,
	author: String,
	url: String,
	isOptionsPanelOpen: Boolean,
	svg: String,
});

const emit = defineEmits(["toggleMenu"]);
const { gradients } = useGradients();
const { opengraphID, generateImage, ogImageUrl } = useOpengraph();

const findStyleById = (id) => {
	return styles.find((style) => style.id === id) || {};
};

const findGradientById = (id) => {
	return gradients.value.find((gradient) => gradient.id === id) || {};
};

const currentStyle = computed(() => findStyleById(opengraphID.value));
const currentGradient = computed(() => findGradientById(opengraphID.value));

const toggleOptionsPanel = () => {
	emit("toggleMenu", !props.isOptionsPanelOpen);
};

const element = (ref < HTMLElement) | (null > null);

onMounted(async () => {
	if (element.value) {
		await generateImage(element.value);
	}
});
</script>
