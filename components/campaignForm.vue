<template>
  <v-container class="fluid">
    <!-- todo change loader with skeleton loader for uniform code -->
    <!-- loader -->
    <div v-if="company == []" class="w-2/5 mx-auto space-y-4">
      <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse my-6 bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse bg-gray-300 h-10 w-full rounded-lg"></div>
    </div>

    <div v-else class="w-2/5 mx-auto space-y-4">
      <p class="text-2xl">{{ company.name }}</p>
      <v-form ref="form">
        <!-- name -->
        <v-text-field
          label="nom de la campagne"
          variant="solo-filled"
          rounded="lg"
          v-model="name"
          :rules="[textRule]"></v-text-field>

        <!-- description -->
        <v-text-field
          label="description"
          variant="solo-filled"
          rounded="lg"
          v-model="description"></v-text-field>

        <!-- submit -->
        <v-btn
          class="mt-2 bg-secondary"
          type="button"
          block
          @click="submit"
          rounded="lg"
          :loading="props.loading">
          <span class="text-0 font-semibold text-base"> ajouter </span>
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script setup>
// update need → id comp to add campaign
// create need → campaign data to update it
import { textRule } from "@/composables/rules";

const props = defineProps({
  company: {
    type: Object,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const form = ref(null);
const name = ref("");
const description = ref("");
const emit = defineEmits(["submit"]);

function submit() {
  const validation = form.value.validate();
  validation.then(async (success) => {
    if (success.valid) {
      emit("submit", { name, description });
    }
  });
}
</script>
