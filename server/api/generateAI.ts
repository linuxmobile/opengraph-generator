import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const config = useRuntimeConfig();

const google = createGoogleGenerativeAI({
	apiKey: config.apiKey,
});

const PROMPT_INTRO =
	"You are an expert in SEO and social media copywriting. I provide you with the metadata of a web page in JSON format, including title, description, author, keywords, and headers h1 to h3.";
const TITLE_INSTRUCTIONS =
	"Your task is to create an optimized OpenGraph title. It should be engaging and concise (maximum 60 characters), contain important keywords, and be designed to maximize engagement on social platforms.";
const DESCRIPTION_INSTRUCTIONS =
	"You need to create an optimized OpenGraph description. It should be between 140-160 characters, providing a clear and persuasive summary that motivates users to click. Ensure that keywords are naturally incorporated.";
const PROMPT_CONCLUSION =
	"Generate the best title and description considering these limitations and using the context of the provided metadata.";

export default defineEventHandler(async (event) => {
	const metadata = await readBody(event);

	const prompt = `
        ${PROMPT_INTRO}
        Here is the metadata:
        Title: ${metadata.title}
        Description: ${metadata.description}
        ${TITLE_INSTRUCTIONS}
        ${DESCRIPTION_INSTRUCTIONS}
        ${PROMPT_CONCLUSION}
    `;

	const { object } = await generateObject({
		model: google("models/gemini-1.5-pro-latest"),
		schema: z.object({
			opengraph: z
				.object({
					title: z.string(),
					description: z.string(),
				})
				.describe(
					"OpenGraph metadata for improve SEO and social media engagement.",
				),
		}),
		mode: "json",
		prompt: prompt,
	});

	return {
		title: object.opengraph.title,
		description: object.opengraph.description,
	};
});
