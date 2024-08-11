import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

interface Metadata {
	url: string;
	title: string | null;
	description: string | null;
	favicon?: string | null;
	keywords?: string[];
	author?: string;
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

	const setFilteredMetadata = (newMetadata: Metadata) => {
		const filteredMetadata: Partial<Metadata> = {
			url: newMetadata.url,
			title: newMetadata.title,
			description: newMetadata.description,
			favicon: newMetadata.favicon,
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
			url: newOldMetadata.url,
			title: newOldMetadata.title,
			description: newOldMetadata.description,
			favicon: newOldMetadata.favicon,
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
