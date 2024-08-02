import * as cheerio from "cheerio";

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
	let { url } = getQuery(event) as { url: string };

	if (!url) {
		return {
			error: "No URL provided",
		};
	}

	if (!/^https?:\/\//i.test(url)) {
		url = `https://${url}`;
	}

	try {
		const html: string = await $fetch(url);
		const $ = cheerio.load(html);

		const metadata: Metadata = {
			title: $("head title").text() || null,
			description: $('head meta[name="description"]').attr("content") || null,
			author: $('head meta[name="author"]').attr("content") || null,
			keywords: $('head meta[name="keywords"]').attr("content") || null,
			favicon: $('link[rel="icon"]').attr("href") || null,
			headings: {
				h1: $("h1")
					.map((i, el) => $(el).text())
					.get(),
				h2: $("h2")
					.map((i, el) => $(el).text())
					.get(),
				h3: $("h3")
					.map((i, el) => $(el).text())
					.get(),
			},
		};

		$("meta").each((i, el) => {
			const property = $(el).attr("property");
			if (property?.startsWith("og:")) {
				const key = property.substring(3);
				metadata[key] = $(el).attr("content") || null;
			}
		});

		return metadata;
	} catch (error: any) {
		return {
			error: `Failed to fetch or parse the URL: ${error.message}`,
		};
	}
});
