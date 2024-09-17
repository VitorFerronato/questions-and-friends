<template>
  <div class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <Login-Header />

      <Login-Form />

      <Login-Footer />
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "",
  });
  useHead({
    title: "LOGIN | SIGN-IN",
  });
</script>
