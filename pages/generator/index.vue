<template>
<div class="relative min-h-dvh w-full mx-auto pt-5 pb-3 px-6 flex flex-col items-center justify-center select-none">
  <header class="w-full flex items-center justify-between">
		<Logo
		  class="flex items-center w-full justify-start pb-3"
		  :text="'!text-6xl'"
			:icon="'!size-4.5'" />
		<NuxtLink
		  target="_blank"
			:href="'https://github.com/linuxmobile/opengraph-generator'"
			class="rounded-full p-2 bg-white/10 flex gap-x-2 group">
			<p class="group-hover:block hidden pr-1 text-nowrap">Give a Star!</p>
			<Github class="size-6" />
		</NuxtLink>
	</header>
	<main class="grow grid grid-cols-auto md:grid-cols-12 w-full py-3 pb-6 gap-5">
	  <section class="md:col-span-8 w-full items-start justify-center flex flex-col gap-y-6">
  	  <Categories />
      <Opengraph-Preview />
		</section>
	  <Opengraph-Options />
	</main>
	<footer class="flex items-center justify-center w-full gap-x-2 text-sm">
	  <p>made with</p>
		<div class="relative">
  	  <NuxtIcon class="size-5" />
  	  <NuxtIcon class="size-5 inset-0 -z-1 absolute blur-sm" />
		</div>
		<p>and</p>
		<div class="relative">
  		<Unocss class="size-5" />
  		<Unocss class="size-5 inset-0 -z-1 absolute blur-sm" />
		</div>
	</footer>
</div>
</template>
<script setup>
import Github from "~/assets/Github.vue";
import NuxtIcon from "~/assets/Nuxt.vue";
import Unocss from "~/assets/Unocss.vue";
</script>
