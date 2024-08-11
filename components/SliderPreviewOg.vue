<template>
  <div class="min-h-50% md:min-h-72">
    <OpengraphPreview
      :title="sessionTitle"
      :description="sessionDescription ? sessionDescription : undefined"
      :author="metadata.author"
      :url="metadata.url ? metadata.url : undefined"
      :svg="metadata.svg ? metadata.svg : undefined"
      :selectedId="metadata.selectedId"
      :isSlider="true"
      @updateSelectedId="updateSelectedId"
    />
  </div>
</template>

<script setup>
const { metadata, oldMetadata } = useMetadata();

const emit = defineEmits([
	"updateSelectedId",
	"updateMetadata",
	"updateOldMetadata",
]);

const sessionTitle = ref(metadata.value.title);
const sessionDescription = ref(metadata.value.description);

function updateSelectedId(id) {
	emit("updateSelectedId", id);
	emit("updateMetadata", { ...metadata.value, selectedId: id });
	emit("updateOldMetadata", metadata.value);
}

function updateMetadataFromOldMetadata() {
	if (oldMetadata.value) {
		sessionTitle.value = oldMetadata.value.title;
		sessionDescription.value = oldMetadata.value.description;
	}
}

function updateMetadataFromProps() {
	if (metadata.value) {
		sessionTitle.value = metadata.value.title;
		sessionDescription.value = metadata.value.description;
		emit("updateOldMetadata", metadata.value);
	}
}

watch(metadata, () => {
	updateMetadataFromProps();
});

updateMetadataFromOldMetadata();
</script>
