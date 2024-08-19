export function normalizeUrl(url: string): string {
	url = url.toLowerCase();
	if (!url.startsWith("http://") && !url.startsWith("https://")) {
		url = `https://${url}`;
	}
	if (url.endsWith("/")) {
		url = url.slice(0, -1);
	}
	return url;
}
