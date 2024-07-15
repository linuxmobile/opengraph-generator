<template>
  <main class="relative h-screen w-full flex flex-col-reverse">
    <SliderPreviewOg
    :title="metadata.title"
    :description="metadata.description"
    :author="metadata.author"
    />
    <section class="h-full">
      <div v-for="(value, key) in metadata" :key="key">
        <strong>{{ key }}:</strong> {{ value }}
      </div>
    </section>
  </main>
</template>
<script setup>
import SliderPreviewOg from '~/components/SliderPreviewOg.vue';

const { metadata } = useMetadata();
</script>