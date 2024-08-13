<template>
  <AILoadingIndicator />
  <NuxtPage/>
</template>
<script setup lang="ts">
import AILoadingIndicator from "~/components/nuxt-loading-indicator";
useHead({
	bodyAttrs: {
		class:
			"bg-black text-white font-sans antialiased min-h-dvh [&>div]:h-full relative",
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
@font-face {
  font-family: 'Space Grotesk';
  src: url(/assets/SpaceGrotesk.woff2);
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}
@font-face {
  font-family: 'Satoshi';
  src: url(/assets/Satoshi.woff2);
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}
</style>
