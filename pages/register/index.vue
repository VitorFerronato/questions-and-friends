<template>
  <div class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <Login-Header :title="'Create account'" :subtitle="'Get started to have fun!'" />

      <Login-Create-Account-Form />

      <Login-Footer :title="`Already have an account?`" :subtitle="'Sign in here!'" :path="'/'" />
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "",
    middleware: "already-logged-in",
  });
  useHead({
    title: "LOGIN | CREATE USER",
  });
</script>
