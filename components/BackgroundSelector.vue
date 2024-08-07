<script lang="ts" setup>
const { fetchGradients, gradients } = useGradients();
const { setOpengraphID } = useOpengraph();

onMounted(() => {
  /**
   * Fetch new gradients only if none exist.
   * This prevents fetching new gradients every time the options panel opens.
   */
  if (!gradients.value.length) {
    fetchGradients(8);
  }
});
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <img v-if="gradients" v-for="gradient in gradients" :src="gradient.gradient" :key="gradient.gradient"
      class="aspect-ratio-square rounded max-w-15 cursor-pointer" @click="setOpengraphID(gradient.id)" />
  </div>
</template>
