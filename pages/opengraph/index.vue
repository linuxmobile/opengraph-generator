<template>
  <main class="">
    <div v-for="(value, key) in metadata" :key="key" class="metadata-item">
      <strong>{{ key }}:</strong> {{ value }}
    </div>
  </main>
</template>
<script setup>
const { metadata } = useMetadata();
</script>