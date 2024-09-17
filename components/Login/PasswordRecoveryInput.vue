<template>
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
</template>

<script lang="ts" setup>
  import { sendPasswordResetEmail } from "firebase/auth";
  import { ref } from "vue";



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

      snackbar("we sent you an email!", "success");
    } catch (error: any) {
      console.log(error.message);
      snackbar("Error recovering password", "error");
    }
  });
</script>
