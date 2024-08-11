import * as cheerio from "cheerio";

export const useMetadataService = () => {
	const extractMetadata = async (url: string) => {
		if (!/^https?:\/\//i.test(url)) {
			url = `https://${url}`;
		}

		const html: string = await $fetch(url);
		const $ = cheerio.load(html);

		const metadata: { [key: string]: string | null } = {
			title: $("head title").text() || null,
			description: $('head meta[name="description"]').attr("content") || null,
			author: $('head meta[name="author"]').attr("content") || null,
			keywords: $('head meta[name="keywords"]').attr("content") || null,
			favicon: $('link[rel="icon"]').attr("href") || null,
			headings: $("h1, h2, h3")
				.map((i, el) => $(el).text())
				.get()
				.join(", "),
		};

		$("meta").each((i, el) => {
			const property = $(el).attr("property");
			if (property?.startsWith("og:")) {
				const key = property.substring(3);
				metadata[key] = $(el).attr("content") || null;
			}
		});

		return metadata;
	};

	return { extractMetadata };
};
