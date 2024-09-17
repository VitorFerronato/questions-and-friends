<template>
  <div class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <Login-Header
        :title="'Sign in'"
        :subtitle="'Welcome back! Enter your details to get started'"
      />

      <Login-Sign-in-Form />

      <Login-Footer
        :title="`Don't have an account?`"
        :subtitle="'Create one here!'"
        :path="'/register'"
      />
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
