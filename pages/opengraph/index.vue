<template>
  <main class="relative h-screen w-full flex flex-col-reverse p-5">
    <MetadataOptions v-show="isOptionsPanelOpen" :title="metadata.title" :description="metadata.description"
      @metadata-update="updateMetadata" @toggle-menu="toggleMenu" />

    <SliderPreviewOg :title="metadata.title" :description="metadata.description" :author="metadata.author"
      :url="metadata.url" />

    <PreviewOG :title="metadata.title" :description="metadata.description" :author="metadata.author" :url="metadata.url"
      :isOptionsPanelOpen="isOptionsPanelOpen" @toggle-menu="toggleMenu" />
  </main>
</template>

<script setup lang="ts">
import SliderPreviewOg from "~/components/SliderPreviewOg.vue";

const { metadata, setMetadata } = useMetadata();

function updateMetadata(metadata: any) {
  setMetadata(metadata)
}

const isOptionsPanelOpen = ref(false)

function toggleMenu(v: boolean) {
  isOptionsPanelOpen.value = v
}
</script>
