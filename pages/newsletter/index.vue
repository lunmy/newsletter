<template>
  <v-row class="filter__quote">
    <v-col cols="10" class="flex items-center justify-end">
      <v-text-field
          v-model="criteria.name"
          :disabled="loading"
          placeholder="Rechercher une newsletter"
          prepend-inner-icon="mdi-search"
          clear-icon="mdi-close-circle"
          rounded-full
          variant="solo-filled"
          hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="flex items-center justify-end">
      <nuxt-link to="/template/create" class="w-full">
        <v-btn
            :disabled="loading"
            class="w-full"
            color="primary-0"
            text-color="white"
            prepend-icon="mdi-email-outline"
        >Ajouter une newsletter
        </v-btn>
      </nuxt-link>
    </v-col>
  </v-row>
  <div v-if="loading" class="text-center pt-3">
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2" ></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
  </div>
  <div v-else>
  </div>
</template>
<script setup>
const criteria = ref({
  name: "",
  page: 1,
  itemsPerPage: 20
});

const loading = ref(false);
</script>
