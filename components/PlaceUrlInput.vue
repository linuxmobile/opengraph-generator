<template>
  <form @submit.prevent="handleSubmit" class="w-full flex items-center justify-center">
    <div class="relative flex items-center justify-center w-full max-w-md">
      <input
        type="text"
        v-model="url"
        class="w-full px-12 py-2 text-white placeholder-white/60 bg-white/10 backdrop-blur-md rounded-full
          focus:outline-none border-2 border-gray-200/50 drop-shadow-2xl"
        :placeholder="placeholder"/>
      <Sparkles class="top-1/2 left-3 absolute -translate-y-1/2 bg-transparent border-none p-0 size-5 text-gray-400" />
      <button
        type="submit"
        class="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center
          px-4 py-1 text-gray-400 bg-black/10 border-1 border-gray-500/40 rounded-full p-0
          hover:bg-gradient-to-t hover:from-black/20 hover:to-transparent bg-gradient-to-t
          from-black/5 to-transparent">
        <p class="font-semibold text-white/80 mb-0.3">Generate</p>
        <ArrowRight />
      </button>
    </div>
  </form>
</template>

<script setup>
import { ArrowRight, Sparkles } from "lucide-vue-next";
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
			router.push("/opengraph");
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
