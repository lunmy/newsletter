<template>
  <div class="bg-slate-700 d-flex">
    <img src="@/public/img/logo.svg" alt="" />

    <span class="d-flex align-center mx-auto">
      <p class="text-white">Marques</p>
      <p class="m-4 text-white">/</p>
      <p class="text-white">NewsLetters</p>
    </span>
  </div>

 <div
    v-if="companiesList !== null && companiesList.length > 0"
    class="container mx-auto p-10 grid grid-cols-6 gap-6"
  >
    <brandCard v-for="company in companiesList" :company="company" />
  </div>
</template>

<script setup>
import brandCard from "~/components/C-BrandCard.vue";
definePageMeta({
  middleware: ["auth"],
});
const companiesList = ref([]);

// instance api
const { $apiSamarkand } = useNuxtApp();
const criteria = {
  page: 2,
  "groups[]": ["campaign:read", "company:details"],
};

async function getCompagniesList() {
  try {
    return await $apiSamarkand.getCompanies(criteria);
  } catch (error) {
    console.log("Error fetching data");
  }
}
companiesList.value = await getCompagniesList();
// const companiesList = ref(await getCompagniesList());
</script>
