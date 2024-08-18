import { useGlobalGenericState } from "~/utils/useGlobalGenericState";
import { reactive } from "vue";

export const storeRef = reactive({
	domRef: null as HTMLElement | null,
});

export const useTemplateRefState = () => {
	const [templateRef, setTemplateRef] =
		useGlobalGenericState<HTMLElement | null>("templateRef", null);

	return { templateRef, setTemplateRef, storeRef };
};
