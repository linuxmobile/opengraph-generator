<script lang="ts" setup>
import { SMALL_SCREEN_MAX_WIDTH } from '~/constants';

interface Props {
  title: string;
  description: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["metadataUpdate", "toggleMenu"]);
const isSmallScreen = useMediaQuery(`(max-width: ${SMALL_SCREEN_MAX_WIDTH})`);

const data = ref({
  title: props.title,
  description: props.description,
});

// Watch for changes in props and update data accordingly
watch(
  () => props,
  (newProps) => {
    data.value = { ...newProps };
  },
  { deep: true },
);

watch(
  data,
  (newMetadata) => {
    emit("metadataUpdate", newMetadata);
  },
  { deep: true },
);

const containerStyles = computed(() => {
  if (isSmallScreen.value) {
    return "bg-slate-950 z-50 fixed border border-slate-900 rounded-t-3xl max-h-[24rem] w-full bottom-0 left-0 p-6 overflow-y-scroll"
  }

  return "bg-slate-950 z-50 border border-slate-900 rounded-3xl fixed top-2 left-2 px-3 py-6 w-full max-w-sm min-h-[calc(100dvh-20px)]"
})
</script>

<template>
  <section :class="containerStyles"
    class="transition-all [&_h2]:text-sm [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-slate-300 space-y-12">
    <div>
      <button @click="$emit('toggleMenu', false)" class="text-slate-300 flex justify-end">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>

    <div class="space-y-6">
      <div class="flex flex-col gap-y-4">
        <h2>
          Metadata
        </h2>

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

      <div class="flex flex-col gap-y-4">
        <h2>Style</h2>
        <BackgroundSelector />
      </div>
    </div>
  </section>
</template>
