<template>
  <aside class="md:col-span-4 w-full h-full p-4 bg-white/5 flex flex-col gap-y-8">
    <div class="">
      <label for="title" class="text-sm font-medium">Title</label>
      <input
        id="title"
        v-model="metadata.title"
        type="text"
        class="mt-1 w-full px-3 py-2 rounded-md bg-white/10"
      />
    </div>
    <div class="">
      <label for="description" class="text-sm font-medium">Description</label>
      <textarea
        id="description"
        v-model="metadata.description"
        type="text"
        class="mt-1 w-full px-3 py-2 rounded-md bg-white/10"
      />
    </div>
    <div class="">
      <label for="url" class="text-sm font-medium">URL</label>
      <input
        id="url"
        v-model="metadata.url"
        type="text"
        class="mt-1 w-full px-3 py-2 rounded-md bg-white/10"
      />
    </div>
    <div v-if="metadata.author" class="">
      <label for="author" class="text-sm font-medium">Author</label>
      <input
        id="author"
        v-model="metadata.author"
        type="text"
        class="mt-1 w-full px-3 py-2 rounded-md bg-white/10"
      />
    </div>
  </aside>
</template>

<script setup>
const { metadata } = useMetadata();
</script>
