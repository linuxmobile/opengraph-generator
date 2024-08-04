<template>
  <section
    ref="previewSection"
    class="w-full h-full flex flex-col rounded-3xl bg-cover bg-center"
    :style="{ backgroundImage: currentGradient ? `url(${currentGradient.gradient})` : '' }">
    <div class="px-5 flex flex-col justify-center h-full">
      <h1 :class="currentStyle?.title">{{ props.title }}</h1>
      <p :class="currentStyle?.description">{{ props.description }}</p>
      <p v-if="props.author" :class="currentStyle?.author">{{ props.author }}</p >
      <p :class="currentStyle?.url">{{ props.url }}</p>
    </div>
  </section>
</template>

<script setup>
import styles from "~/assets/styles.json";

const props = defineProps({
	title: String,
	description: String,
	author: String,
	url: String,
});

const { gradients } = useGradients();
const { opengraphID, generateImage } = useOpengraph();

const findStyleById = (id) => {
	return styles.find((style) => style.id === id) || {};
};

const findGradientById = (id) => {
	return gradients.value.find((gradient) => gradient.id === id) || {};
};

const currentStyle = computed(() => findStyleById(opengraphID.value));
const currentGradient = computed(() => findGradientById(opengraphID.value));

const previewSection = ref(null);

onMounted(async () => {
	if (previewSection.value) {
		await generateImage(previewSection.value);
	}
});
</script>
