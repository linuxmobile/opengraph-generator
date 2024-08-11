interface Metadata {
	favicon: string;
	url: string;
}

export function getAbsoluteFaviconUrl(metadata: Metadata): string | null {
	if (!metadata.favicon || !metadata.url) return null;
	const baseUrl = metadata.url.endsWith("/")
		? metadata.url.slice(0, -1)
		: metadata.url;

	const faviconPath = metadata.favicon.startsWith("/")
		? metadata.favicon.slice(1)
		: metadata.favicon;

	return metadata.favicon.startsWith("http")
		? metadata.favicon
		: `${baseUrl}/${faviconPath}`;
}
