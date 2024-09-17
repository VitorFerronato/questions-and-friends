<template>
  <div>
    <div class="flex justify-end">
      <NuxtLink to="/main" :class="isLoading ? 'pointer-events-none' : ''">
        <UiButton variant="outline" :disabled="isLoading">
          <Icon name="lucide:arrow-left" />
          Voltar
        </UiButton>
      </NuxtLink>
    </div>

    <form @submit="submit">
      <fieldset :disabled="isLoading">
        <div>
          <Field name="word" label="Word *" placeholder="Ex: Coliseum" as="UiVeeInput" />
          <ErrorMessage name="word" />
        </div>

        <div class="mt-6">
          <Field name="tips" label="Tips" placeholder="[hint 1, hint 2]" as="UiVeeTextarea" />
          <ErrorMessage name="tips" />
        </div>

        <div class="flex justify-end">
          <UiButton type="submit" :loading="isLoading" class="mt-2 w-24">
            <Icon v-show="isLoading" class="h-4 w-4 animate-spin" name="lucide:loader-2" /> Create
          </UiButton>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { collection, doc, setDoc } from "firebase/firestore";
  import { ref } from "vue";

  useHead({
    title: "INSERT QUESTIONS",
  });

  const user = useCurrentUser();
  const db = useFirestore();
  const collectionName = "cards";

  const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(WordSchema),
  });

  const isLoading = ref(false);
  const submit = handleSubmit(async (values) => {
    isLoading.value = true;

    try {
      const cardRef = doc(collection(db, collectionName));

      await setDoc(cardRef, {
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.value?.uid,
      });

      resetForm();
      snackbar("Card created successfully!", "success");
    } catch (error: any) {
      console.error(error.message);
      snackbar("Something went wrong, try again later!", "error");
    }

    isLoading.value = false;
  });
</script>
