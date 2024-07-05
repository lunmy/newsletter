<template>
  <!-- need all campaign of a company -->
  <!-- foreach campaign need all newsletters -->
  <h1 class="p-4 text-2xl font-bold text-center">Campaigns</h1>
  <v-data-table
    :group-by="groupBy"
    :headers="headers"
    :items="newslettersList"
    item-value="name"
  >
    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
      <tr>
        <td :colspan="columns.length">
          <VBtn
            :icon="isGroupOpen(item) ? '$expand' : '$next'"
            size="small"
            variant="text"
            @click="toggleGroup(item)"
          ></VBtn>
          {{ item.value }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup>
const { $apiSamarkand } = useNuxtApp();
import { getIdFromIri } from "@/composables/utils";
const route = useRoute();

const companiesList = ref([]);
const criteria = {
  "groups[]": ["company:details"],
};
const newslettersList = ref([]);
const groupBy = ref([{ key: "name", order: "asc" }]);
const headers = ref([
  {
    align: "start",
    sortable: false,
  },
  { title: "newsletter", key: "name" },
  { title: "id", key: "@id" },
]);
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

          newslettersList.value.push({
            name: data["name"],
            id: getIdFromIri(data["@id"]),
            // : id
            newsletters: data["newsletters"],
          });
        });
        console.log(
          "🚀 ~ company.campaigns.forEach ~ campaignsList.value:",
          newslettersList.value
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
