<template>
  <div v-if="loading" class="text-center pt-20">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div
    v-if="companiesList !== null && companiesList.length > 0"
    class="mx-auto p-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
    <brandCard
      class="mx-auto"
      v-for="company in companiesList"
      :company="company" />
  </div>
</template>

<script setup>
import brandCard from "~/components/companyCard.vue";
const { $apiSamarkand } = useNuxtApp();

const loading = ref(true);
const companiesList = ref([]);
const criteria = {
  "groups[]": ["campaign:read", "company:details"],
};

async function getCompagniesList() {
  try {
    companiesList.value = await $apiSamarkand.getAllCompanies(criteria);
    loading.value = false;
  } catch (error) {
    // handling error here ??
    console.log(error.status);
    console.log(error);
  }
}
getCompagniesList();
</script>
