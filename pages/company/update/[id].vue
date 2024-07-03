<template>
  <h1 class="text-xl font-bold text-center">Update</h1>
  <p
    v-if="modifictaion"
    class="py-4 text-center text-xl font-semibold text-green-500"
  >
    Modification réussi
  </p>
  <companyForm :company="company" @submit="updateCompany" />
</template>

<script setup>
import companyForm from "../components/companyForm.vue";
import { getIdFromIri } from "@/composables/utils";

const { $apiSamarkand } = useNuxtApp();
const route = useRoute();
const modifictaion = ref(false);
const company = ref({});
const id = route.params.id;

async function getCompanyInfo() {
  try {
    company.value = await $apiSamarkand.getOneCompany(id);
  } catch (error) {
    console.log(error);
  }
}

async function updateCompany(data) {
  try {
    await $apiSamarkand.updateCompany(id, data.company);

    if (data.newImg.value.length > 0 && data.newImg.value[0] !== undefined) {
      // delete old image
      await $apiSamarkand.removeCompanyImage(
        id,
        getIdFromIri(data.company["images"][0])
      );

      // add new one
      const img = new FormData();
      img.append("file", data.newImg.value[0]);
      img.append("tag", "desktop");

      await $apiSamarkand.setCompanyIamge(id, img);
      modifictaion.value = true;
    }
    getCompanyInfo();
  } catch (error) {
    console.log(error);
  }
}

if (route.params.id !== null && route.params.id !== undefined) {
  await getCompanyInfo();
}
</script>
