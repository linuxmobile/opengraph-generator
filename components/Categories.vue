<template>
  <div class="w-full flex items-center justify-between md:justify-start gap-x-3">
    <button
      v-for="category in Object.keys(templates)"
      :key="category"
      :class="getButtonClass(category)"
      @click="setCategory(category)"
      class="px-4 py-2 rounded-full bg-white/20 text-xl outline-none">
      {{ category }}
    </button>
  </div>
</template>
<script setup>
const { selectedCategory, setCategory } = useTemplateStore();

const categoryStyles = {
	minimal: "!bg-[#f89b29] text-black",
	gradients: "bg-gradient-to-r from-[#ff0f7b] to-[#f89b29] text-white",
	colorful:
		"bg-gradient-to-r from-green-400 via-yellow-300 to-lime-500 text-black",
	typographic: "!bg-white text-gray-700 font-boska font-black",
};

const getButtonClass = (category) => {
	const isSelected = selectedCategory.value === category;
	return isSelected ? categoryStyles[category] : "";
};
</script>
