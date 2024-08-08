<template>
  <div class="min-h-50% md:min-h-72">
    <OpengraphPreview
      :title="title"
      :description="description ? description : undefined"
      :author="author"
      :url="url ? url : undefined"
      :svg="svg ? svg : undefined"
      :selectedId="selectedId"
      :isSlider="true"
      @updateSelectedId="updateSelectedId"
    />
  </div>
</template>

<script setup>
const props = defineProps({
	title: String,
	description: String,
	author: String,
	url: String,
	svg: String,
	selectedId: Number,
});

const emit = defineEmits(["updateSelectedId"]);

function updateSelectedId(id) {
	emit("updateSelectedId", id);
}
</script>
