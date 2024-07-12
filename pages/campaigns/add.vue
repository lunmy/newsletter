<template>
  <h1 class="p-4 text-2xl font-bold text-center">Ajouter une campagne</h1>
  <campaignForm
      :campaign="campaign"
      :loading="loading"
      @submit="createCampaign" />
</template>
<script setup>
import campaignForm from "~/components/campaignForm.vue";
const config = useRuntimeConfig();
const { $apinewsletter } = useNuxtApp();
const campaign = ref({
  name: "",
  description: "",
  images: [],
  company: `/companies/${config.public.DEFAULT_COMPANY_ID}`,
});
const loading = ref(false);

async function createCampaign(campaign){
  loading.value = true;
  try {
    await $apinewsletter.createCampaign(campaign);
    successToast("Campagne ajoutée");
    navigateTo('/campaigns')
  } catch (error) {
    console.log("error:", error);
  }
  loading.value = false;
}
</script>
