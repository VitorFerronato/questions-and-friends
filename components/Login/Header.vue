<template>
  <div class="text-center">
    <h1 class="text-3xl font-semibold lg:text-4xl">{{ title }}</h1>
    <p class="text-muted-foreground">{{ subtitle }}</p>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: String,
    subtitle: String,
  });
</script>
