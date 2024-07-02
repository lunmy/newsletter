<!-- modify brand image or name -->
<template>
  <h1 class="text-xl font-bold text-center">Update</h1>
  <companyForm :company="company" @submit="updateCompany" />
</template>

<script setup>
import companyForm from "../components/companyForm.vue";
import { getIdFromIri } from "@/composables/utils";

const { $apiSamarkand } = useNuxtApp();
const route = useRoute();

const company = ref("");
const isloading = ref(false);
const id = route.params.id;

async function getCompanyInfo() {
  try {
    company.value = await $apiSamarkand.getOneCompany(id);
  } catch (error) {
    console.log(error);
  }
}

if (route.params.id !== null && route.params.id !== undefined) {
  await getCompanyInfo();
}

async function reset() {
  isloading.value = false;
  await getCompanyInfo();
}
async function updateCompany(data) {
  try {
    isloading.value = true;

    // delete old image if existing one
    if (data.company["images"][0] !== undefined) {
      await $apiSamarkand.removeCompanyImage(
        id,
        getIdFromIri(data.company["images"][0])
      );
    }
    // add new one
    const img = new FormData();
    img.append("file", data.newImg.value[0]);
    img.append("title", "untitre");
    img.append("tag", "desktop");
    await $apiSamarkand.setCompanyIamge(id, img);
    // get new img id
    data.company.images[0] = await $apiSamarkand.getOneCompany(id);
    await $apiSamarkand.updateCompany(id, data.company);
    await reset();
  } catch (error) {
    console.log(error);
  }
}
</script>
