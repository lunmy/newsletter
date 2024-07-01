<!-- modify brand image or name -->
<template>
  <h1 class="text-xl font-bold text-center">Update</h1>
  <companyForm :company="company" @submit="updateCompany" />
</template>

<script setup>
import companyForm from "../components/companyForm.vue";

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
async function updateCompany(newData) {
  try {
    isloading.value = true;
    const data = JSON.stringify({
      name: newData.newName,
    });
    await $apiSamarkand.updateCompany(id, data);
    reset();
  } catch (error) {
    console.log(error);
  }
}
</script>
