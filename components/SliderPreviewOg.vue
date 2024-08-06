<template>
  <section class="w-full h-50% py-4">
    <div class="h-full flex flex-row gap-x-6 max-w-screen overflow-x-auto snap-x snap-mandatory">
      <div
        ref="firstSliderItem"
        @click="handleOpengraph(gradient.id)"
        v-for="(gradient, index) in gradientsWithStyles.slice(0,3)"
        :key="gradient.id"
        :style="{ backgroundImage: `url(${gradient.gradient})` }"
        class="relative rounded-3xl aspect-video h-full p-3
          select-none flex flex-col items-center justify-center gap-y-2
          cursor-pointer bg-cover bg-center snap-center">
        <div class="text-white">
          <img :src="svg" :class="gradient.style.svg"/>
          <p :class="gradient.style.title" class="w-full">{{ title }}</p>
          <p :class="gradient.style.description" class="line-clamp-2">{{ description }}</p>
          <p :class="gradient.style.author">{{ author }}</p>
          <p :class="gradient.style.url">{{ url }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import styles from "~/assets/styles.json";
const { gradients, fetchGradients } = useGradients();
const { setOpengraphID, generateImage } = useOpengraph();

const props = defineProps({
	title: String,
	description: String,
	author: String,
	url: String,
	svg: String,
});

const findStyleById = (id) => {
	const style = styles.find((style) => style.id === id);
	return style || {};
};

const gradientsWithStyles = computed(() => {
	return gradients.value.map((gradient) => {
		const style = findStyleById(gradient.id);
		return { ...gradient, style };
	});
});

const handleOpengraph = (id) => {
	setOpengraphID(id);
};

const firstSliderItem = ref(null);

onMounted(async () => {
	fetchGradients(3);
});

watch(firstSliderItem, async (newVal) => {
	if (Array.isArray(newVal) && newVal.length > 0) {
		await nextTick();
		const firstElement = newVal[0];
		if (firstElement instanceof HTMLElement) {
			const result = await generateImage(firstElement);
			return result;
		} else {
			console.error("firstElement is not a valid HTMLElement");
		}
	} else {
		console.error("firstSliderItem is not a valid array or is empty");
	}
});
</script>
