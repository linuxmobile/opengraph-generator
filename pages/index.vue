<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
<template>
  <video autoplay muted loop class="inset-x-0 absolute z-1 w-full overflow-x-hidden scale-200 opacity-50" src="/assets/background.webm" />
  <main class="h-full w-full relative z-2 flex flex-col gap-y-7">
    <h2 class="text-5xl font-black text-center text-balance text-transparent bg-gradient-to-r from-white via-white to-transparent bg-clip-text">
      Illuminate the Web:
      <span class="bg-gradient-to-r from-purple-100 to-purple-500 bg-clip-text"> AI OpenGraphs </span>
      that Redefine Connection</h2>
    <PlaceUrlInput />
  </main>
  <footer class="text-center stick bottom-2">© {{currentYear}} Stealth Ltd. No Rights Reserved. </footer>
</template>
