<template>
  <UiNavbar sticky class="flex justify-between items-center  h-16 px-4">
    <NuxtLink class="text-lg font-semibold hover:underline" to="/main">
      <p>Questions and Friends</p>
    </NuxtLink>

    <div>
      <UiButton
        @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'"
        size="icon-sm"
        variant="ghost"
        title="Toggle theme"
      >
        <span class="sr-only">Toggle theme</span>
        <Icon class="h-4 w-4" name="lucide:sun-medium" />
      </UiButton>
      <UiButton @click="logout" size="icon-sm" variant="ghost" title="Logout">
        <span class="sr-only">Logout</span>
        <Icon class="h-4 w-4" name="lucide:log-out" />
      </UiButton>
    </div>
  </UiNavbar>
</template>

<script setup lang="ts">
  import { signOut } from "firebase/auth";

  const auth = useFirebaseAuth();

  const logout = async () => {
    await signOut(auth!);
    await navigateTo("/", { replace: true });
  };
</script>

<style lang="scss" scoped></style>
