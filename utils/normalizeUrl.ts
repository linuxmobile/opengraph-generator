export function normalizeUrl(url: string): string {
	if (!url.startsWith("http://") && !url.startsWith("https://")) {
		url = `https://${url}`;
	}
	if (url.endsWith("/")) {
		url = url.slice(0, -1);
	}
	return url;
}
