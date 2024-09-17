<template>
  <div class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <Login-Header
        :title="'Forgot password'"
        :subtitle="'Let us help you sign in to your account'"
      />

      <Login-Password-Recovery-Input />
    </div>
  </div>
</template>

<script setup>
  useHead({
    title: "LOGIN | PASSWORD RECOVERY",
  });
  definePageMeta({
    layout: "",
    middleware: "already-logged-in",
  });
</script>
