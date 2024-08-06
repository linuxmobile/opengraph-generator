<script lang="ts" setup>
interface Props {
	title: string;
	description: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["metadataUpdate", "toggleMenu"]);
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

const data = ref({
	title: props.title,
	description: props.description,
});

watch(
	data,
	(newMetadata) => {
		emit("metadataUpdate", newMetadata);
	},
	{ deep: true },
);
</script>

<template>
  <dialog
    class="fixed top-0 left-0 min-h-dvh z-50 max-w-[280px] bg-slate-950 border-r border-r-slate-800 px-4 py-4 flex flex-col gap-y-4 ml-0"
    open>

    <button @click="$emit('toggleMenu', false)" class="text-slate-300 flex justify-end">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>

    <div>
      <h2 class="text-sm font-bold uppercase tracking-tight text-slate-300 mb-5">Metadata</h2>

      <div class="flex flex-col space-y-4">
        <div class="space-y-1">
          <label for="og_title" class="text-sm font-medium text-slate-400">Title</label>
          <input id="og_title" type="text" v-model="data.title"
            class="w-full h-10 p-2 bg-transparent border border-slate-800 rounded-md outline-none text-white" />
        </div>

        <div class="space-y-1">
          <label for="og_description" class="text-sm font-medium text-slate-400">Description</label>
          <textarea id="og_description" type="text" v-model="data.description"
            class="w-full min-h-40 p-2 bg-transparent border border-slate-800 rounded-md resize-none outline-none text-white"
            autocomplete="off" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-sm font-bold uppercase tracking-tight text-slate-300 mb-5">Style</h2>

      <div class="flex flex-wrap gap-4">
        <img v-if="gradients" v-for="gradient in gradients" :src="gradient.gradient" :key="gradient.gradient"
          class="aspect-ratio-square rounded max-w-15 cursor-pointer" @click="setOpengraphID(gradient.id)" />
      </div>
    </div>
  </dialog>
</template>
