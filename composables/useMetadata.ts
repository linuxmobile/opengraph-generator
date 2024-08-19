import { useGlobalGenericState } from "~/utils/useGlobalGenericState";
import { useStorage } from "@vueuse/core";

interface Metadata {
	url: string;
	title: string | null;
	description: string | null;
	favicon?: string | null;
	keywords?: string[];
	author?: string;
	shortUrl?: string;
	og_image_url?: string | null;
}

export const useMetadata = () => {
	const [metadata, setMetadata] = useGlobalGenericState<Metadata>(
		"metadata",
		{} as Metadata,
	);

	const [oldMetadata, setOldMetadata] = useGlobalGenericState<Metadata>(
		"oldMetadata",
		{} as Metadata,
	);

	// Create a storage for metadata & oldMetadata
	const metadataStorage = useStorage("metadata", metadata.value);
	const oldMetadataStorage = useStorage("oldMetadata", oldMetadata.value);

	watch(metadata, (newMetadata) => {
		metadataStorage.value = newMetadata;
	});

	watch(oldMetadata, (newOldMetadata) => {
		oldMetadataStorage.value = newOldMetadata;
	});

	const setFilteredMetadata = (newMetadata: Metadata) => {
		const filteredMetadata: Partial<Metadata> = {
			url:
				newMetadata.url && newMetadata.url.endsWith("/")
					? newMetadata.url.slice(0, -1)
					: newMetadata.url,
			title: newMetadata.title,
			description: newMetadata.description,
			favicon: newMetadata.favicon,
			og_image_url: newMetadata.og_image_url || null,
			shortUrl: newMetadata.shortUrl,
		};

		if (newMetadata.keywords && newMetadata.keywords.length > 0) {
			filteredMetadata.keywords = newMetadata.keywords;
		}

		if (newMetadata.author) {
			filteredMetadata.author = newMetadata.author;
		}

		setMetadata(filteredMetadata as Metadata);
	};

	const setFilteredOldMetadata = (newOldMetadata: Metadata) => {
		const filteredOldMetadata: Partial<Metadata> = {
			url:
				newOldMetadata.url && newOldMetadata.url.endsWith("/")
					? newOldMetadata.url.slice(0, -1)
					: newOldMetadata.url,
			title: newOldMetadata.title,
			description: newOldMetadata.description,
			favicon: newOldMetadata.favicon,
			og_image_url: newOldMetadata.og_image_url || null,
		};

		if (newOldMetadata.keywords && newOldMetadata.keywords.length > 0) {
			filteredOldMetadata.keywords = newOldMetadata.keywords;
		}

		if (newOldMetadata.author) {
			filteredOldMetadata.author = newOldMetadata.author;
		}

		setOldMetadata(filteredOldMetadata as Metadata);
	};

	return {
		metadata,
		setMetadata: setFilteredMetadata,
		oldMetadata,
		setOldMetadata: setFilteredOldMetadata,
	};
};
