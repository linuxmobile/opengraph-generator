<template>
  <OpengraphPreview
    :title="title"
    :description="description"
    :author="author"
    :url="url"
    :svg="svg"
    :selectedId="selectedId"
    :isSlider="true"
    @updateSelectedId="updateSelectedId"
  />
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
