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

const url = ref("");
const router = useRouter();
const { setMetadata, metadata } = useMetadata();
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
	if (!url.value) {
		return;
	}
	let normalizedUrl = url.value;
	if (
		!normalizedUrl.startsWith("http://") &&
		!normalizedUrl.startsWith("https://")
	) {
		normalizedUrl = `https://${normalizedUrl}`;
	}
	start();
	try {
		const urlResponse = await $fetch("/api/urls", {
			method: "POST",
			body: {
				originalUrl: normalizedUrl,
				isAnonymous: true,
			},
		});

		if (urlResponse.body && urlResponse.body.shortUrl) {
			const shortUrl = urlResponse.body.shortUrl;
			const fetchedMetadata = await $fetch(
				`/api/extract-metadata?url=${encodeURIComponent(url.value)}`,
			);
			if (fetchedMetadata) {
				setMetadata({ ...fetchedMetadata, url: normalizedUrl });
				if (metadata.value) {
					const { title, description, author, keywords, headings } =
						metadata.value;
					const filteredMetadata = {
						title,
						description,
						author,
						keywords,
						headings,
					};

					const urlExists = await $fetch(
						`/api/urls?originalUrl=${encodeURIComponent(normalizedUrl)}`,
						{ method: "GET" },
					);

					if (urlExists) {
						const existingOGData = await $fetch(
							`/api/opengraph_images?originalUrl=${encodeURIComponent(normalizedUrl)}`,
						);

						let generatedTitle, generatedDescription;

						if (
							existingOGData.body &&
							existingOGData.body.title &&
							existingOGData.body.description
						) {
							generatedTitle = existingOGData.body.title;
							generatedDescription = existingOGData.body.description;
						} else {
							const generatedData = await useGenerateAI(filteredMetadata);
							generatedTitle = generatedData.generatedTitle;
							generatedDescription = generatedData.generatedDescription;

							await $fetch("/api/opengraph_images", {
								method: "POST",
								body: {
									title: generatedTitle,
									description: generatedDescription,
									shortUrl: shortUrl,
									originalUrl: normalizedUrl,
								},
							});
						}
					} else {
						console.error("El originalUrl no existe en la tabla referenciada");
					}
					router.push("/opengraph");
				}
			} else {
				console.error("Fetched metadata is null or undefined");
				setMetadata(null);
			}
		}
	} catch (error) {
		console.error("Error in handleSubmit:", error);
		setMetadata(null);
	} finally {
		finish();
	}
};
</script>
