<template>
  <h1 class="p-4 text-2xl font-bold text-center">Campaigns</h1>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="campaignsList"
    item-value="name"
    expand-on-click
    :loading="loading">
    <!-- loader template -->
    <template v-slot:loading>
      <span v-for="i in [...Array(5).keys()]">
        <v-skeleton-loader type="text" width="400"></v-skeleton-loader>
        <v-skeleton-loader type="divider"></v-skeleton-loader>
      </span>
    </template>
    <!-- slot to access principal row-->
    <template v-slot:item.name="{ item }">
      <td class="font-bold">
        {{ item.name }} ({{ item["newsletters"].length }})
      </td>
    </template>
    <!-- slot to access extended row -->
    <template v-slot:expanded-row="{ item }">
      <!-- sub table -->
      <v-data-table
        :items="item['newsletters']"
        :headers="subHeaders"
        class="pl-10">
        <template v-slot:item.name="{ item }">
          <NuxtLink :to="'/newsletters/view/' + getIdFromIri(item['@id'])">
            {{ item.name }}
          </NuxtLink>
        </template>
      </v-data-table>
    </template>
  </v-data-table>
</template>

<script setup>
import { getIdFromIri } from "@/composables/utils";
const { $apiSamarkand } = useNuxtApp();
const route = useRoute();

const loading = ref(true);
const updatePath = ref("");
const campaignsList = ref([]);
const expanded = ref([]);
const headers = ref([
  {
    title: "Name:",
    key: "name",
    align: "left",
    sortable: true,
  },
]);
const subHeaders = ref([
  {
    title: "Name",
    key: "name",
  },
  // todo implement when date will be accessible
  {
    title: "Date",
    key: "@type", // date here
  },
]);

async function getCampaignsList() {
  try {
    const criteria = {
      "groups[]": ["campaign:read", "newsletter:read"],
    };

    const tempData = await $apiSamarkand.getAllCampaigns(criteria);

    // for each campaign
    tempData.forEach(async (campaign) => {
      const compID = route.params.id;
      // if id of the company is in the campaign data
      if (compID === getIdFromIri(campaign["company"])) {
        campaignsList.value.push(campaign);
      }
      updatePath.value = "/company/update/" + getIdFromIri(campaign["@id"]);
      //todo: else → get all list if super admin
    });
    loading.value = false;
  } catch (error) {
    console.log(error.status);
    console.log(error);
  }
}
getCampaignsList();
</script>
