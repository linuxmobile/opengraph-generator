<template>
  <form @submit.prevent="handleSubmit" class="flex items-center justify-center">
    <div class="relative">
      <input type="text" v-model="url" class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="https://linu.dev/"/>
      <button type="submit" class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 bg-transparent border-none p-0">
        <Search />
      </button>
    </div>
  </form>
  <div v-if="metadata" class="mt-4">
    <div v-for="(value, key) in metadata" :key="key" class="py-2">
      <strong>{{ key }}:</strong> {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next';

interface Metadata {
  [key: string]: string | null;
}

const url = ref('');
const metadata = ref<Metadata | null>(null);

const handleSubmit = async () => {
  try {
    const fetchedMetadata = await $fetch<Metadata>(`/api/extract-metadata?url=${encodeURIComponent(url.value)}`);
    metadata.value = fetchedMetadata;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    metadata.value = null;
  }
};
</script>