<template>
  <div class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <div class="text-center">
        <h1 class="text-3xl font-semibold lg:text-4xl">Forgot password</h1>
        <p class="text-muted-foreground">Let us help you sign in to your account</p>
      </div>

      <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput name="email" label="Email *" placeholder="fulano@gmail.com" />

          <UiButton type="submit" :loading="isLoading">
            <Icon v-show="isLoading" class="h-4 w-4 animate-spin" name="lucide:loader-2" /> Send
            instructions
          </UiButton>

          <UiDivider label="or" />

          <UiButton to="/" type="button" variant="outline" class="w-full"> Go to sign in </UiButton>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { sendPasswordResetEmail } from "firebase/auth";
  import { ref } from "vue";

  useHead({
    title: "LOGIN | PASSWORD RECOVERY",
  });
  definePageMeta({
    layout: false,
  });

  const auth = useFirebaseAuth();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(ForgotPasswordSchema),
  });

  let isLoading = ref(false);
  const submit = handleSubmit(async (values, ctx) => {
    try {
      await sendPasswordResetEmail(auth!, values.email, {
        url: "http://localhost:3000",
      });

      snackbar("Enviamos um email a você!", "success");
    } catch (error: any) {
      console.log(error.message);
      snackbar("Erro ao recuperar senha", "error");
    }
  });
</script>
