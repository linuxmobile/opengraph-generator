<template>
  <AILoadingIndicator />
  <NuxtPage/>
</template>
<script setup lang="ts">
import AILoadingIndicator from "~/components/nuxt-loading-indicator";
useHead({
	bodyAttrs: {
		class:
			"bg-slate-950 text-white font-sans antialiased min-h-screen [&>div]:h-full relative overflow-x-hidden",
	},
});
</script>
<style>
@font-face {
  font-family: 'Boska';
  src: url(/assets/Boska.woff2);
  font-weight: 100 900;
  font-display: swap;
  font-style: italic;
}
@font-face {
  font-family: 'Switzer';
  src: url(/assets/Switzer.woff2);
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}
</style>
