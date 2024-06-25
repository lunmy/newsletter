<template>
  <div class="bg-slate-700 d-flex">
    <img src="@/public/img/logo.svg" alt="" />

    <span class="d-flex align-center mx-auto">
      <p class="text-white">Marques</p>
      <p class="m-4 text-white">/</p>
      <p class="text-white">NewsLetters</p>
    </span>
  </div>

  <!-- <div
    v-if="companiesList !== null && companiesList.length > 0"
    class="container mx-auto p-10 grid grid-cols-6 gap-6"
  >
    <brandCard v-for="company in companiesList" :company="company" />
  </div> -->
</template>

<script setup>
import brandCard from "~/components/C-BrandCard.vue";
definePageMeta({
  middleware: ["auth"],
});

// instance api
const { $api } = useNuxtApp();
const test = useNuxtApp();
const criteria = {
  page: 1,
  groups: ["campaign:read", "company:details"],
};

async function getCompagniesList() {
  try {
    console.log($api);
    // missing query param and bearer token
    const xhr = await $apiSamarkand.getCompanies(criteria);
    // const response = await JSON.parse(xhr);
  } catch (error) {
    console.log("Error fetching data");
    console.log(error);
  }
}
getCompagniesList();
// const companiesList = ref(await getCompagniesList());
</script>
