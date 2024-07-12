<template>
  <h1 class="p-4 text-2xl font-bold text-center">Modifier une campagne</h1>
  <div  v-if="campaign !== null">
  <campaignForm
      :campaign="campaign"
      :loading="loading"
      @submit="updateCampaign" />
  </div>
</template>
<script setup>
import campaignForm from "~/components/campaignForm.vue";
const route = useRoute();
const { $apinewsletter } = useNuxtApp();
const campaign=ref(null);
const loading = ref(false);



onMounted(async () => {
  if (route.params.id !== null && route.params.id !== undefined) {
    campaign.value = await $apinewsletter.getOneCampaign(route.params.id);
  }
})


async function updateCampaign(data) {
  loading.value = true;
  try {
    console.log(data.images)
    await $apinewsletter.updateCampaign(data);
    successToast("Campagne modifiée");
    navigateTo('/campaigns')
  } catch (error) {
    console.log("error:", error);
  }
  loading.value = false;
}

</script>
