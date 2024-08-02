import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

export const useOpengraph = () => {
	const [opengraphID, setOpengraphID] = useGlobalGenericState<number>(
		"opengraphID",
		1,
	);

	return { opengraphID, setOpengraphID };
};
