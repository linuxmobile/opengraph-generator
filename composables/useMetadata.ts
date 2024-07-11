import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

interface Metadata {
  url: string;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  author: string | null;
}

export const useMetadata = () => {
  const [metadata, setMetadata] = useGlobalGenericState<Metadata>('metadata', {} as Metadata);

  const setFilteredMetadata = (newMetadata: Metadata) => {
    const filteredMetadata: Metadata = {
      url: newMetadata.url,
      title: newMetadata.title,
      description: newMetadata.description,
      keywords: newMetadata.keywords,
      author: newMetadata.author,
    };
    setMetadata(filteredMetadata);
  };

  return {
    metadata,
    setMetadata: setFilteredMetadata,
  };
}