<script setup lang="ts">
import { Search } from 'lucide-vue-next';
</script>
<template>
  <form action="" class="flex items-center justify-center">
    <div class="relative">
      <Search class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
      <input type="text" class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="https://linu.dev/"/>
    </div>
  </form>
</template>