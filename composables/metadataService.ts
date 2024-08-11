import { parseHTML } from "linkedom";

export const useMetadataService = () => {
	const extractMetadata = async (url: string) => {
		if (!/^https?:\/\//i.test(url)) {
			url = `https://${url}`;
		}

		const html: string = await $fetch(url);
		const { document } = parseHTML(html);

		const metadata: {
			[key: string]:
				| string
				| null
				| { h1: string[]; h2: string[]; h3: string[] };
		} = {
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
	};

	return { extractMetadata };
};
