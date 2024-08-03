<template></template>
<script setup>
const user = useSupabaseUser();

watch(
	user,
	() => {
		if (user.value) {
			return navigateTo("/");
		}
	},
	{ immediate: true },
);
</script>
