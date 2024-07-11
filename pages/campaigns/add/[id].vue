<template>
  <h1 class="p-4 text-2xl font-bold text-center">Ajouter une campagne</h1>
  <p
    v-if="modification"
    class="py-4 text-center text-xl font-semibold text-green-500">
    Modification réussi
  </p>

  <campaignForm
    :company="company"
    :loading="loading"
    @submit="createCampaign" />
</template>

<script setup>
import campaignForm from "~/components/campaignForm.vue";

const route = useRoute();
const { $apiSamarkand } = useNuxtApp();

const loading = ref(false);
const company = ref({});
const modification = ref(false);
async function getCompanyInfo() {
  try {
    loading.value = true;
    company.value = await $apiSamarkand.getOneCompany(route.params.id);
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
}
async function createCampaign(data) {
  try {
    loading.value = true;
    const datas = {
      name: `${data.name.value}`,
      company: `/companies/${route.params.id}`,
      description: `${data.description.value}`,
    };
    await $apiSamarkand.createCampaign(datas);

    modification.value = true;
    loading.value = false;
  } catch (error) {
    console.log("error:", error);
  }
}
getCompanyInfo();
</script>
