<template>
  <h1 class="p-4 text-2xl font-bold text-center">Campaigns</h1>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="campaignsList"
    item-value="name"
    expand-on-click
  >
    <!-- slot to access principal row-->
    <template v-slot:item.name="{ item }">
      <td class="font-bold">{{ item.name }}</td>
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <!-- todo ?? insert data-table to display header and allow order by value in header ?? -->
      <!-- slot to access extended row -->
      <tr v-if="item.newsletters.length !== 0" v-for="news in item.newsletters">
        <td x :colspan="columns.length" class="flex justify-between">
          <a href="#" class="pl-10 inline-block">{{ news["name"] }}</a>
          <linkBtn
            class="mr-10 h-min my-auto"
            _label="modifier"
            _borderColor="border-validation-success"
            :_path="updatePath"
          />
        </td>
      </tr>
      <tr v-else>
        <td>Empty</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup>
import { getIdFromIri } from "@/composables/utils";
import linkBtn from "../components/linkBtn.vue";
const { $apiSamarkand } = useNuxtApp();
const route = useRoute();

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
  // todo implement when date will be accessible
  // {
  //   title: "date:",
  //   key: "newsletters['name']", // put key of date here
  //   align: "left",
  //   sortable: true,
  // },
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
  } catch (error) {
    console.log(error.status);
    console.log(error);
  }
}
getCampaignsList();
</script>
