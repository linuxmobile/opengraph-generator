import { templates } from "~/utils/templates";

export const useTemplateStore = () => {
	const [selectedCategory, setSelectedCategory] = useGlobalGenericState<string>(
		"selectedCategory",
		"minimal",
	);
	const [activeTemplate, setActiveTemplateState] = useGlobalGenericState(
		"activeTemplate",
		templates[selectedCategory.value as keyof typeof templates][0],
	);

	const setCategory = (category: string) => {
		setSelectedCategory(category);
		setActiveTemplateState(templates[category as keyof typeof templates][0]);
	};

	const setActiveTemplate = (templateId: number) => {
		const template = templates[
			selectedCategory.value as keyof typeof templates
		].find((t) => t.id === templateId);
		if (template) {
			setActiveTemplateState(template);
		}
	};

	return {
		selectedCategory,
		activeTemplate,
		setCategory,
		setActiveTemplate,
	};
};
