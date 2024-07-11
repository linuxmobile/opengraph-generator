<template>
  <form @submit.prevent="handleSubmit" class="flex items-center justify-center">
    <div class="relative">
      <input type="text" v-model="url" class="px-4 py-2 border border-gray-800 text-white bg-neutral-900 rounded-md focus:outline-none" placeholder="https://linu.dev/"/>
      <button type="submit" class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 bg-transparent border-none p-0">
        <Search />
      </button>
    </div>
  </form>
</template>

<script setup>
import { Search } from 'lucide-vue-next';

const url = ref('');

const { setMetadata } = useMetadata();

const handleSubmit = async () => {
  try {
    const fetchedMetadata = await $fetch(`/api/extract-metadata?url=${encodeURIComponent(url.value)}`);
    setMetadata(fetchedMetadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    setMetadata(null);
  }
};
</script>