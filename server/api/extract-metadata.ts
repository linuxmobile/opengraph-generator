import { parseHTML } from "linkedom";
const config = useRuntimeConfig();

type Metadata = {
	title: string | null;
	description: string | null;
	author: string | null;
	keywords: string | null;
	favicon: string | null;
	headings: { h1: string[]; h2: string[]; h3: string[] };
	[key: string]: string | null | { h1: string[]; h2: string[]; h3: string[] };
};

export default defineEventHandler(async (event) => {
	const apiSecretToken = event.node.req.headers["x-api-secret"];

	if (apiSecretToken !== config.private.apiSecretToken) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized",
		});
	}

	let { url } = getQuery(event) as { url: string };

	if (!url) {
		return {
			error: "No URL provided in extract-metadata",
		};
	}

	if (!/^https?:\/\//i.test(url)) {
		url = `https://${url}`;
	}

	try {
		const html: string = await $fetch(url);
		const { document } = parseHTML(html);

		const metadata: Metadata = {
			title: document.querySelector("head title")?.textContent || null,
			description:
				document
					.querySelector('head meta[name="description"]')
					?.getAttribute("content") || null,
			author:
				document
					.querySelector('head meta[name="author"]')
					?.getAttribute("content") || null,
			keywords:
				document
					.querySelector('head meta[name="keywords"]')
					?.getAttribute("content") || null,
			favicon:
				document.querySelector('link[rel="icon"]')?.getAttribute("href") ||
				null,
			headings: {
				h1: Array.from(document.querySelectorAll("h1")).map(
					(el) => el.textContent || "",
				),
				h2: Array.from(document.querySelectorAll("h2")).map(
					(el) => el.textContent || "",
				),
				h3: Array.from(document.querySelectorAll("h3")).map(
					(el) => el.textContent || "",
				),
			},
		};

		document.querySelectorAll("meta").forEach((el) => {
			const property = el.getAttribute("property");
			if (property?.startsWith("og:")) {
				const key = property.substring(3);
				metadata[key] = el.getAttribute("content") || null;
			}
		});

		return metadata;
	} catch (error: any) {
		return {
			error: `Failed to fetch or parse the URL: ${error.message}`,
		};
	}
});
