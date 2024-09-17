<template>
  <form @submit="submit" class="mt-10">
    <fieldset :disabled="isSubmitting" class="grid gap-5">
      <UiVeeInput name="email" label="Email *" placeholder="fulano@gmail.com" />
      <UiVeeInput name="password" label="Password *" type="password" />
      <p>
        <NuxtLink to="/forgot-password" class="text-sm font-semibold text-primary hover:underline"
          >Forgot password?</NuxtLink
        >
      </p>
      <UiButton type="submit" :loading="isLoading">
        <Icon v-show="isLoading" class="h-4 w-4 animate-spin" name="lucide:loader-2" /> Sign in
      </UiButton>

      <UiDivider label="or" />

      <UiButton @click="signInWithGoogle" type="button" variant="outline" class="w-full">
        <Icon name="logos:google-icon" />
        Sign in with Google
      </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts">
  import { GoogleAuthProvider } from "firebase/auth";

  export const googleAuthProvider = new GoogleAuthProvider();
</script>

<script lang="ts" setup>
  import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
  import { ref } from "vue";

  const auth = useFirebaseAuth();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(LoginSchema),
  });

  let isLoading = ref(false);
  const submit = handleSubmit(async (values, ctx) => {
    isLoading.value = true;
    try {
      await signInWithEmailAndPassword(auth!, values.email, values.password);

      return await navigateTo("/main", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      snackbar("incorrect email or password!", "error");
    }
    isLoading.value = false;
  });

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth!, googleAuthProvider);

      return await navigateTo("/main", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      snackbar("Error trying to sign-in, try again later!", "error");
    }
  };
</script>
