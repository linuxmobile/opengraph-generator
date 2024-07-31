import * as cheerio from "cheerio";

type Metadata = {
	title: string | null;
	description: string | null;
	author: string | null;
	keywords: string | null;
	[key: string]: string | null;
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
			headings: $("h1, h2, h3").attr("content") || null,
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
