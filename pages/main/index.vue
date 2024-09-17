<template>
  <div>
    <h1 class="text-2xl font-semibold lg:text-3xl">Welcome back {{ user?.displayName }}!</h1>

    <div class="mt-10">
      <div class="flex gap-2">
        <UiButton type="button">
          <Icon name="lucide:plus" />
          New game
        </UiButton>

        <NuxtLink to="/main/insert-questions">
          <UiButton
            v-if="user?.email == 'vitorferronato@gmail.com'"
            variant="outline"
            type="button"
          >
            <Icon name="lucide:between-horizontal-start" />
            Insert questions
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <Home-Description />
  </div>
</template>

<script setup>
  definePageMeta({ middleware: "auth" });
  const user = useCurrentUser();
</script>

<style lang="scss" scoped></style>
