<template>
  <main class="relative h-screen w-full flex flex-col-reverse p-5">
    <SliderPreviewOg
    :title="metadata.title"
    :description="metadata.description"
    :author="metadata.author"
    :url="metadata.url"
    />
    <PreviewOG
    :title="metadata.title"
    :description="metadata.description"
    :author="metadata.author"
    :url="metadata.url"
    />
  </main>
</template>
<script setup>
import SliderPreviewOg from "~/components/SliderPreviewOg.vue";

const { metadata } = useMetadata();
</script>
