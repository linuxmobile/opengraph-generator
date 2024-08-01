
<template>
  <section class="bg-slate-900 w-full h-60% py-4">
    <div class="h-full flex flex-row gap-x-2 max-w-screen overflow-x-auto px-4">
      <div
        v-for="gradient in gradientsWithStyles"
        :key="gradient.id"
        class="relative rounded-xl aspect-video w-max-content h-60% p-3">
        <img
          :src="gradient.gradient"
          alt="Gradient Background"
          class="absolute inset-0 w-full h-full object-cover z-0 rounded-3xl"/>
        <div class="relative z-10 text-white">
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

onMounted(() => {
	fetchGradients(5);
});
</script>
