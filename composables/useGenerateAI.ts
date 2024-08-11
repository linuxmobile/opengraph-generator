const config = useRuntimeConfig();
export const useGenerateAI = async (metadata: any) => {
	try {
		const data = await $fetch("/api/generateAI", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-secret": config.private.apiSecretToken,
			},
			body: JSON.stringify(metadata),
		});

		if (data) {
			return {
				generatedTitle: data.title,
				generatedDescription: data.description,
			};
		} else {
			console.log("No data returned from API");
			return {
				generatedTitle: "",
				generatedDescription: "",
			};
		}
	} catch (error) {
		console.error("Error fetching AI data:", (error as Error).message);
		throw new Error((error as Error).message);
	}
};
