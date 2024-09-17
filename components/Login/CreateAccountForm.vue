<template>
  <form @submit="submit" class="mt-10">
    <fieldset :disabled="isSubmitting" class="grid gap-5">
      <UiVeeInput name="name" label="Full name *" placeholder="Fulano algo" />
      <UiVeeInput name="email" label="Email *" placeholder="fulano@gmail.com" />
      <UiVeeInput name="password" label="Password *" type="password" />

      <UiButton type="submit" :loading="isLoading">
        <Icon v-show="isLoading" class="h-4 w-4 animate-spin" name="lucide:loader-2" /> Create
        account
      </UiButton>

      <UiDivider label="or" />

      <UiButton @click="signUpWithGoogle" type="button" variant="outline" class="w-full">
        <Icon name="logos:google-icon" />
        Sign up with Google
      </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts">
  import { GoogleAuthProvider } from "firebase/auth";

  export const googleAuthProvider = new GoogleAuthProvider();
</script>

<script lang="ts" setup>
  import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
  import { ref } from "vue";


  const auth = useFirebaseAuth();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(RegisterSchema),
  });

  let isLoading = ref(false);
  const submit = handleSubmit(async (values, ctx) => {
    isLoading.value = true;
    try {
      const { user } = await createUserWithEmailAndPassword(auth!, values.email, values.password);
      await updateProfile(user, { displayName: values.name });

      return await navigateTo("/main", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      snackbar("Error creating user ", "error");
    }
    isLoading.value = false;
  });

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth!, googleAuthProvider);

      return await navigateTo("/main", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      snackbar("Error creating user ", "error");
    }
  };
</script>
