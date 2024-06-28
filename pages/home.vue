<template>
  <div
    v-if="companiesList !== null && companiesList.length > 0"
    class="container mx-auto p-10 grid grid-cols-5 gap-6"
  >
    <brandCard v-for="company in companiesList" :company="company" />
  </div>
</template>

<script setup>
import brandCard from "~/components/C-BrandCard.vue";
const { $apiSamarkand } = useNuxtApp();

const companiesList = ref([]);
const criteria = {
  "groups[]": ["campaign:read", "company:details"],
};

async function getCompagniesList() {
  try {
    companiesList.value = await $apiSamarkand.getAllCompanies(criteria);
    return;
  } catch (error) {
    // handling error here ??
    console.log(error.status);
    console.log(error);
  }
}
getCompagniesList();
</script>
