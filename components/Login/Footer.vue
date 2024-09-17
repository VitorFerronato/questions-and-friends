<template>
  <p class="mt-10 text-center text-sm">
    {{ title }}

    <NuxtLink :to="path" class="cursor-pointer text-sm font-semibold text-primary hover:underline">
      {{ subtitle }}
    </NuxtLink>
  </p>
</template> 

<script setup>
  const props = defineProps({
    title: String,
    subtitle: String,
    path: String,
  });
</script>
