<template>
  <div class="w-full h-full min-h-98 relative">
    <OpengraphPreview
      :title="title"
      :description="description"
      :author="author"
      :url="url"
      :svg="svg"
      :selectedId="selectedId"
      :isSlider="false"
      :className="'!max-w-full'"
      @updateSelectedId="updateSelectedId"
    />
    <div class="w-full absolute bottom-4 right-2 text-slate-300 p-4 rounded-b-3xl flex justify-end">
      <button @click="emitToggleOptionsPanel">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>
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
	className: String,
	isOptionsPanelOpen: Boolean,
});

const emit = defineEmits(["updateSelectedId", "toggleOptionsPanel"]);

function updateSelectedId(id) {
	emit("updateSelectedId", id);
}
function emitToggleOptionsPanel() {
	emit("toggleOptionsPanel");
}
</script>
