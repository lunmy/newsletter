<template>
  <h1 class="p-4 text-2xl font-bold text-center">Campaigns</h1>
  <v-data-table
    :group-by="groupBy"
    :headers="headers"
    :items="newslettersList"
    item-value="name"
  >
    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
      <tr>
        <td :colspan="columns.length" class="color-blue-500">
          <!-- :icon="isGroupOpen(item) ? '$expand' : '$next'" -->
          <VBtn elevation="0" @click="toggleGroup(item)"
            ><span class="normal-case font-semibold">{{ item.value }}</span>
          </VBtn>
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
const groupBy = ref([{ key: "nameCampaign", order: "asc" }]);
const headers = ref([
  {
    align: "center",
    sortable: false,
  },
  { title: "newsletter", key: "nameNews" },
]);
/**
 * Asynchronous function to fetch all newsletters for a specific company and group them by campaign.
 *
 * Retrieves all companies based on a set criteria, then iterates over each company to find the one matching the current page's ID.
 * For each campaign of the selected company, fetches campaign data and its associated newsletters.
 * Populates the newslettersList with the retrieved data, including newsletter ID, name, associated campaign name, and campaign ID.
 * If a campaign has no newsletters, a default entry with 'VIDE' as the newsletter name is added to newslettersList.
 */
async function getCampaignsList() {
  try {
    // todo fetch all campaigns instead of all compagniesData
    companiesList.value = await $apiSamarkand.getAllCompanies(criteria);
    // for each company
    companiesList.value.forEach(async (company) => {
      const compID = route.params.id;
      //   if company id == id of this page
      if (compID === getIdFromIri(company["@id"])) {
        // for each campaigns
        company.campaigns.forEach(async (campaign) => {
          // fetch data of the campaign
          const campaigns = await $apiSamarkand.getOneCampaign(
            getIdFromIri(campaign)
          );
          if (campaigns["newsletters"].length > 0) {
            await campaigns["newsletters"].forEach(async (newsletter) => {
              newsletter = await $apiSamarkand.getOneNewsletter(
                getIdFromIri(newsletter)
              );
              newslettersList.value.push({
                idNews: `${getIdFromIri(newsletter["@id"])}`,
                nameNews: `${newsletter["name"]}`,
                nameCampaign: `${newsletter["campaign"]["name"]}`,
                idcampaign: `${getIdFromIri(newsletter["campaign"]["@id"])}`,
              });
            });
          } else {
            newslettersList.value.push({
              idNews: ``,
              nameNews: `VIDE`,
              nameCampaign: `${campaigns["name"]}`,
              idcampaign: `${getIdFromIri(campaigns["@id"])}`,
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error.status);
    console.log(error);
  }
}
getCampaignsList();
</script>
