<template>
  <NuxtLink :href="'/'" class="relative tracking-1">
    <div class="absolute z-1 blur-lg opacity-60">
      <Sparkle class="size-7" :class="props.icon"/>
      <p class="font-boska text-9xl font-black" :class="props.text"><span class="text-transparent bg-gradient-to-r from-[#ff0f7b] to-[#f89b29] bg-clip-text">Ok</span>ai!</p>
    </div>
    <div class="relative z-2">
      <Sparkle class="size-7" :class="props.icon"/>
      <h1 class="font-boska text-9xl font-black" :class="props.text"><span class="text-transparent bg-gradient-to-r from-[#ff0f7b] to-[#f89b29] bg-clip-text">Ok</span>ai!</h1>
    </div>
  </NuxtLink>
</template>
<script setup>
import Sparkle from "~/assets/Sparkle.vue";

const props = defineProps({
	text: String,
	icon: String,
});
</script>
