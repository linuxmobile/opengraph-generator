<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
<template>
  <div class="relative overflow-hidden">
    <uiGridPattern/>
    <main class="min-h-dvh w-full relative z-2 flex items-center justify-center flex-col max-w-4xl mx-auto select-none">
      <div class="flex-grow flex flex-col items-center justify-center gap-y-8">
        <Logo class="pointer-events-none" />
        <h2 class="text-5xl font-bold text-center text-balance text-transparent bg-gradient-to-r from-white via-white to-transparent bg-clip-text">
          Illuminate the Web:
          AI OpenGraphs
          that Redefine Connection</h2>
        <PlaceUrlInput />
      </div>
      <footer class="text-center flex-none pb-3 text-white/60">© {{currentYear}} Stealth Ltd. <span class="text-white/80 font-medium">No Rights Reserved.</span></footer>
    </main>
  </div>
</template>
