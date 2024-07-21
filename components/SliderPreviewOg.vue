<template>
  <section class="bg-neutral-900 w-full h-60% py-4">
    <div class="h-full flex flex-row gap-x-2 max-w-screen overflow-x-auto px-4">
      <div v-for="gradient in gradientsWithStyles" :key="gradient.id" class="rounded-xl aspect-video w-auto h-50% p-3" :style="{ background: gradient.gradient }">
        <p :class="gradient.style.title">{{ title }}</p>
        <p :class="gradient.style.description">{{ description }}</p>
        <p :class="gradient.style.author">{{ author }}</p>
        <p :class="gradient.style.url">{{ url }}</p>
      </div>
    </div>
  </section>
</template>
<script setup>
import styles from '~/assets/styles.json'

const gradients = ref([])
const { fewRandomGradients, setOrderedGradients, orderedGradients } = useGradients();

const findStyleByid = (id) => {
  const style = styles.find(style => style.id === id)
  return style || {}
}

const gradientsWithStyles = computed(() => {
  const combined = orderedGradients.value.map(gradient => {
    const style = findStyleByid(gradient.id)
    return { ...gradient, style}
  })
  return combined;
})

defineProps({
  title: String,
  description: String,
  author: String,
  url: String,
  classes: String,
})

onMounted(() => {
  setOrderedGradients(fewRandomGradients);
  gradients.value = orderedGradients.value
})
</script>