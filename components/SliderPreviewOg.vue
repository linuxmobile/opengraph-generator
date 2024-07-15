<template>
  <section class="bg-neutral-900 w-full h-60% py-4">
    <div class="h-full flex flex-row gap-x-2 max-w-screen overflow-x-auto px-4">
      <div v-for="gradient in orderedGradients" :key="gradient.id" class="rounded-xl aspect-video w-auto h-50% p-3" :class="classes" :style="{ background: gradient.gradient }">
        <p>{{ title }}</p>
        <p>{{ description }}</p>
        <p>{{ author }}</p>
      </div>
    </div>
  </section>
</template>
<script setup>

const gradients = ref([])
const { fewRandomGradients, setOrderedGradients, orderedGradients } = useGradients();

defineProps({
  title: String,
  description: String,
  author: String,
  classes: String,
})

onMounted(() => {
  setOrderedGradients(fewRandomGradients);
  gradients.value = orderedGradients.value
})
</script>