<template>

  <div class="bg-slate-700 d-flex">
    <img src="@/public/img/logo.svg" alt="" />

    <span class="d-flex align-center mx-auto">
      <p class="text-white">Marques</p>
      <p class="m-4 text-white">/</p>
      <p class="text-white">NewsLetters</p>
    </span>
  </div>

  <div v-if="companiesList !== null && companiesList.length > 0" class="container mx-auto p-10 grid grid-cols-5 gap-6">
    <brandCard v-for="company in companiesList" :company="company" />
  </div>
</template>

<script setup>

import brandCard from "~/components/C-BrandCard.vue";
const { $apiSamarkand } = useNuxtApp();

const companiesList = ref([]);
const criteria = {
  page: 1,
  "groups[]": ["campaign:read", "company:details"],
};

async function getCompagniesList() {
  try {
    return await $apiSamarkand.getCompanies(criteria);
  } catch (error) {
    console.log(error);
    console.log("Error fetching data");
  }
}

let list = []
let nextPage = true

while (nextPage) {
  let response = await getCompagniesList();
  let compagnies = await response["hydra:member"]
  compagnies.forEach(company => {
    list.push(company)
  });
  if (!response["hydra:view"]["hydra:next"]) {
    nextPage = false
  } else {
    criteria['page']++
  }
}

companiesList.value = list

</script>
