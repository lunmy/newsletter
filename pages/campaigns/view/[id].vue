<template>
  <div class="w-4/5 mx-auto">
    <h1 class="p-4 text-2xl font-bold">Campaigns</h1>
    <div class="w-2/5">
      <ul v-for="campaign in campaignsList" :key="campaign.id">
        <li @click="getCampaignNewsletters">{{ campaign.name }}</li>
        <ul v-for="campaign in campaignsList" :key="campaign.id">
          <li v-for="id in campaign['newsletters']">
            {{ getIdFromIri(id) }}
          </li>
        </ul>
      </ul>
    </div>
    <div class="w-2/5"></div>
  </div>
</template>

<script setup>
const { $apiSamarkand } = useNuxtApp();
import { getIdFromIri } from "@/composables/utils";
const route = useRoute();

const companiesList = ref([]);
const criteria = {
  "groups[]": ["company:details"],
};
const campaignsList = ref([]);

async function getCampaignsList() {
  try {
    companiesList.value = await $apiSamarkand.getAllCompanies(criteria);
    // for each company
    companiesList.value.forEach(async (company) => {
      const compID = route.params.id;
      //   if compani id == id of this page
      if (compID === getIdFromIri(company["@id"])) {
        // for each campaigns
        company.campaigns.forEach(async (campaign) => {
          // fetch data of the campaign
          const data = await $apiSamarkand.getOneCampaign(
            getIdFromIri(campaign)
          );

          campaignsList.value.push({
            name: data["name"],
            id: getIdFromIri(data["@id"]),
            newsletters: data["newsletters"],
          });
        });
        console.log(
          "🚀 ~ company.campaigns.forEach ~ campaignsList.value:",
          campaignsList.value
        );
      }
    });
  } catch (error) {
    console.log(error.status);
    console.log(error);
  }
}
async function getCampaignNewsletters() {
  // foreach newsletterid in
}
getCampaignsList();
</script>
