<template>
  <form @submit.prevent="handleSubmit" class="w-full flex items-center justify-center">
    <div class="relative flex items-center justify-center w-full max-w-md">
      <input
        type="text"
        v-model="url"
        class="w-full px-12 py-3 text-white placeholder-white/70 placeholder-tracking-wide bg-white/10 backdrop-blur-md rounded-full
          focus:outline-none border-1 border-white/30 drop-shadow-2xl"
        :placeholder="placeholder"/>
      <SparkleInput class="top-1/2 left-4 absolute -translate-y-1/2 bg-transparent border-none p-0 size-5 text-white" />
      <button
        type="submit"
        class="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center
          px-2 py-0.5 text-gray-400 bg-black/10 border-1 border-white/40 rounded-full
          hover:bg-gradient-to-t hover:from-black/20 hover:to-transparent bg-gradient-to-t
          from-black/5 to-transparent">
        <p class="text-white/80 mb-0.3 pr-1">Generate</p>
        <ArrowRight class="size-5" />
      </button>
    </div>
  </form>
</template>

<script setup>
import ArrowRight from "~/assets/ArrowRight.vue";
import SparkleInput from "~/assets/SparkleInput.vue";
import { useValidateUrl } from "~/composables/useValidateUrl";
import { normalizeUrl } from "~/utils/normalizeUrl";

const url = ref("");
const router = useRouter();
const { setMetadata, setOldMetadata } = useMetadata();
const { start, finish } = useLoadingIndicator();

const placeholder = ref("");
const placeholderURLs = [
	"https://linu.dev/",
	"https://github.com/linuxmobile",
	"https://twitter.com/LinuDev",
];

const typewriterEffect = (text, callback) => {
	let i = 0;
	const speed = 80;
	const typeWriter = () => {
		if (i < text.length) {
			placeholder.value += text.charAt(i);
			i++;
			setTimeout(typeWriter, speed);
		} else {
			setTimeout(callback, 1800);
		}
	};
	typeWriter();
};

const deleteEffect = (callback) => {
	const speed = 60;
	const deleteWriter = () => {
		if (placeholder.value.length > 0) {
			placeholder.value = placeholder.value.slice(0, -1);
			setTimeout(deleteWriter, speed);
		} else {
			setTimeout(callback, 1000);
		}
	};
	deleteWriter();
};

const cycleUrl = (index = 0) => {
	if (index >= placeholderURLs.length) index = 0;
	typewriterEffect(placeholderURLs[index], () => {
		deleteEffect(() => {
			cycleUrl(index + 1);
		});
	});
};

onMounted(() => {
	cycleUrl();
});

const handleSubmit = async () => {
	const isValid = await useValidateUrl(url.value);
	if (!isValid) {
		finish();
		return;
	}
	if (!url.value) {
		finish();
		return;
	}

	let normalizedUrl = normalizeUrl(url.value);
	start();

	try {
		const response = await $fetch("/api/process-url", {
			method: "POST",
			body: { url: normalizedUrl },
		});
		if (response.body.metadata) {
			setOldMetadata(response.body.oldMetadata);
			setMetadata(response.body.metadata);

			router.push("/generator");
		} else {
			console.error("Failed to process URL", response);
		}
	} catch (error) {
		console.error("Failed to process URL", error);
		setMetadata(null);
	} finally {
		finish();
	}
};
</script>
