import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

export const useMetadata = () => {
  const [metadata, setMetadata] = useGlobalGenericState('metadata', '');

  return {
    metadata,
    setMetadata,
  };
}