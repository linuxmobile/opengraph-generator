
<template>
  <section class="w-full h-50% py-4">
    <div class="h-full flex flex-row gap-x-6 max-w-screen overflow-x-auto snap-x snap-mandatory">
      <div
        @click="handleOpengraph(gradient.id)"
        v-for="gradient in gradientsWithStyles"
        :key="gradient.id"
        :style="{ backgroundImage: `url(${gradient.gradient})` }"
        class="relative rounded-3xl aspect-video w-max-content h-full p-3
          select-none cursor-pointer bg-cover bg-center snap-center">
        <div class="text-white">
          <p :class="gradient.style.title">{{ title }}</p>
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
const { setOpengraphID } = useOpengraph();

const props = defineProps({
	title: String,
	description: String,
	author: String,
	url: String,
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

onMounted(() => {
	fetchGradients(5);
});
</script>
