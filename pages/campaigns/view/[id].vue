<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="campaignsList"
    :search="searchCampText"
    item-value="name"
    expand-on-click
    show-expand
    show-current-page
    page-text=""
    :items-per-page-options="items_per_page"
    :loading="loading">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="ml-8">Campaigns</v-toolbar-title>
        <v-icon
          icon="mdi-plus-circle-outline"
          size="x-large"
          color="green"
          class="mr-8"></v-icon>
      </v-toolbar>
    </template>
    <!-- loader  -->
    <template v-slot:loading>
      <span v-for="i in [...Array(5).keys()]">
        <v-skeleton-loader type="text" width="400"></v-skeleton-loader>
        <v-skeleton-loader type="divider"></v-skeleton-loader>
      </span>
    </template>

    <!-- header  -->
    <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
      <tr class="border-y-1 border-gray-200 bg-slate-100">
        <template v-for="column in columns" :key="column.key">
          <td>
            <span class="mr-2 flex">
              <p
                class="my-auto mx-2 cursor-pointer"
                @click="() => toggleSort(column)">
                {{ column.title }}
              </p>
              <template v-if="isSorted(column)">
                <v-icon :icon="getSortIcon(column)"></v-icon>
              </template>
              <!-- name column -->
              <span v-if="column.key == 'name'" class="flex">
                <v-icon
                  icon="mdi-magnify"
                  @click="toggleSearchCamp()"
                  start
                  size="large"
                  class="my-auto cursor-pointer"></v-icon>
                <!-- search campaign field -->
                <v-text-field
                  v-if="searchCamp"
                  v-model="searchCampText"
                  autofocus
                  clearable
                  @blur="toggleSearchCamp()"
                  update:focused="true"
                  label="Search"
                  variant="outlined"
                  hide-details
                  single-line
                  density="compact"
                  class="max-w-96 w-96"></v-text-field>
              </span>
            </span>
          </td>
        </template>
      </tr>
    </template>
    <!-- items: 'campaings'  -->
    <template v-slot:item.name="{ item }">
      <td class="font-semibold">
        - {{ item.name }} ({{ item["newsletters"].length }})
      </td>
    </template>
    <!-- EXPANDED ROW -->
    <template v-slot:expanded-row="{ item }">
      <!-- sub: table -->
      <v-data-table
        :items="item['newsletters']"
        :headers="subHeaders"
        :search="searchNewsText"
        hide-default-footer
        items-per-page="-1">
        <!-- sub: header  -->
        <template
          v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
          <tr class="border-y-1 border-blue-200 bg-slate-100">
            <template v-for="column in columns" :key="column.key">
              <td>
                <span class="mr-2 flex">
                  <p
                    class="pl-8 my-auto mx-2 cursor-pointer font-semibold"
                    @click="() => toggleSort(column)">
                    {{ column.title }}
                  </p>
                  <template v-if="isSorted(column)">
                    <v-icon :icon="getSortIcon(column)"></v-icon>
                  </template>
                  <!-- sub: header label -->
                  <span v-if="column.key == 'name'" class="flex">
                    <v-icon
                      icon="mdi-magnify"
                      @click="toggleSearchNews()"
                      start
                      size="large"
                      class="my-auto cursor-pointer"></v-icon>
                    <!-- sub: search newsletter field -->
                    <v-text-field
                      v-if="searchNews"
                      v-model="searchNewsText"
                      autofocus
                      clearable
                      @blur="toggleSearchNews()"
                      label="Search"
                      variant="outlined"
                      hide-details
                      single-line
                      density="compact"
                      class="max-w-96 w-96"></v-text-field>
                  </span>
                </span>
              </td>
            </template>
          </tr>
        </template>
        <!-- items: 'newsletters name' -->
        <template v-slot:item.name="{ item }">
          <NuxtLink
            :to="'/newsletters/view/' + getIdFromIri(item['@id'])"
            class="pl-16">
            -{{ item.name.toUpperCase() }}
          </NuxtLink>
        </template>
        <!-- items: 'newsletters createdAt' -->
        <template v-slot:item.createdAt="{ item }">
          {{ $moment(item.createdAt).format("DD/MM/YYYY") }}
        </template>
      </v-data-table>
    </template>
  </v-data-table>
</template>

<script setup>
import { getIdFromIri } from "@/composables/utils";
const { $apiSamarkand } = useNuxtApp();
const route = useRoute();
const { $moment } = useNuxtApp();

const loading = ref(true);
const searchCampText = ref("");
const searchNewsText = ref("");
const searchCamp = ref(false);
const searchNews = ref(false);
const updatePath = ref("");
const campaignsList = ref([]);
const expanded = ref([]);
const items_per_page = ref([1, 5, 10, 15, 20, -1]);
const headers = ref([
  {
    title: "Name:",
    key: "name",
    value: "name",
    align: "left",
    sortable: true,
  },
]);
const subHeaders = ref([
  {
    title: "Newsletter:",
    key: "name",
    value: "name",
  },

  {
    title: "Date:",
    key: "createdAt", // date here
    value: "createdAt",
  },
]);

function toggleSearchCamp() {
  searchCamp.value = !searchCamp.value;
}
function toggleSearchNews() {
  searchNews.value = !searchNews.value;
}
async function getCampaignsList() {
  try {
    const criteria = {
      company: `${route.params.id}`,
      "groups[]": ["campaign:read", "newsletter-info", "timestampable:read"],
    };

    const tempData = await $apiSamarkand.getAllCampaigns(criteria);

    // for each campaign
    tempData.forEach(async (campaign) => {
      campaignsList.value.push(campaign);
      updatePath.value = "/company/update/" + getIdFromIri(campaign["@id"]);
    });
    loading.value = false;
  } catch (error) {
    console.log(error.status);
    console.log(error);
  }
}
getCampaignsList();
</script>
