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
        <div class="flex gap-4">
          <UiVeeInput name="word" label="Word *" placeholder="Ex: Coliseum" />

          <UiVeeSelect label="Categorie" name="categorie" hint="Select a categorie">
            <option v-for="categorie in categories" :key="categorie" :value="categorie">
              {{ categorie }}
            </option>
          </UiVeeSelect>
        </div>

        <div class="mt-6">
          <UiVeeTextarea name="tips" label="Tips" rows="6" placeholder="[hint 1, hint 2]" />
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

  const categories = ["object", "people", "place"];

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
        word: values.word,
        categorie: values.categorie,
        tips: JSON.parse(values.tips),
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
