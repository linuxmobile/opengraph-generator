import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

export const useGenerateAI = async (metadata: any) => {
	const [generatedTitle, setGeneratedTitle] = useGlobalGenericState<string>(
		"generatedTitle",
		"",
	);
	const [generatedDescription, setGeneratedDescription] =
		useGlobalGenericState<string>("generatedDescription", "");

	const response = await fetch("/api/generateAI", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(metadata),
	});

	const data = await response.json();
	setGeneratedTitle(data.title);
	setGeneratedDescription(data.description);

	return { generatedTitle, generatedDescription };
};
