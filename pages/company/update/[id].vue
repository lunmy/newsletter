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

function reset() {
  isloading.value = false;
  getCompanyInfo();
}
async function updateCompany(data) {
  try {
    isloading.value = true;
    // delete old image
    // await $apiSamarkand.removeCompanyImage(
    //   id,
    //   getIdFromIri(data.company["images"][0])
    // );

    // add new one
    const img = new FormData();
    img.append("file", data.newImg.value[0]);
    img.append("title", "untitre");
    img.append("tag", "desktop");

    console.log("updateCompany ~id, img:", id, img);

    await $apiSamarkand.setCompanyIamge(id, img);

    await $apiSamarkand.updateCompany(id, data.company);
    reset();
  } catch (error) {
    console.log(error);
  }
}
</script>
