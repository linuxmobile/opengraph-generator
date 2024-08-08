import * as cheerio from "cheerio";

export async function useValidateUrl(url: string) {
	try {
		const urlPattern = new RegExp(
			"^(https?:\\/\\/)?" +
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
				"((\\d{1,3}\\.){3}\\d{1,3}))" +
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
				"(\\?[;&a-z\\d%_.~+=-]*)?" +
				"(\\#[-a-z\\d_]*)?$",
			"i",
		);
		if (!urlPattern.test(url)) {
			alert("La URL no es válida");
			return false;
		}

		const response = await fetch(url);
		const html = await response.text();

		const $ = cheerio.load(html);

		const title = $("title").text();
		if (!title) {
			alert("La URL no parece ser una página web válida");
			return false;
		}

		return true;
	} catch (error) {
		console.error("Error al validar la URL:", error);
		alert("Error al validar la URL");
		return false;
	}
}
