<template>
  <v-form ref="form" @submit.prevent="submit">
  <v-text-field
        v-model="password"
        label="Mot de passe"
        :rules="[textRule, passwordRule]"
        prepend-inner-icon="mdi-lock"
        rounded-full
        variant="outlined"
        class="w-full mt-5 rounded-2xl"
        type="password"
        required
    />

    <v-text-field
        v-model="confirmation"
        label="Confirmer le mot de passe"
        prepend-inner-icon="mdi-lock"
        rounded-full
        variant="outlined"
        class="w-full mt-5 rounded-2xl"
        type="password"
        :rules="[password === confirmation ? true : 'Les mots de passe ne sont pas identiques']"
        required
    />

    <v-btn
        type="submit"
        class="mt-3 block w-full font-semibold mb-2 rounded-2xl"
        color="primary-0"
        base-color="secondary-0"
        :loading="isloading"
    >
      Réinitialiser
    </v-btn>
    <div v-if="errorMessage !== ''"
         class="text-center text-validation-error mx-4">
      <span class="text-lg">{{ errorMessage }}</span> <br/>
    </div>
  </v-form>
</template>
<script setup>
import {textRule, passwordRule } from "@/composables/rules";

const emit = defineEmits(["submit"]);
const password = ref("");
const confirmation = ref("");
const errorMessage = ref("");
const isloading = ref(false);
const form = ref(null);

async function submit()
{
  const validation = form.value.validate();
  validation.then(async (success) => {
    if (success.valid) {
      emit("submit", password);
    }
  });
}

</script>
