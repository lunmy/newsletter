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
    <!-- Title -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="ml-8"
          >Campagnes: {{ compName }}</v-toolbar-title
        >
        <!-- btn add campaign -->
        <v-btn
          variant="outlined"
          class="mr-8"
          append-icon="mdi-plus-circle-outline"
          @click="nemCampaign">
          <span class="font-semibold tex-center">ajout</span>
        </v-btn>
        <!-- </NuxtLink> -->
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
                  v-if="!toggleCamp"
                  icon="mdi-magnify"
                  @click="toggleSearchCamp()"
                  start
                  size="large"
                  class="ml-2 my-auto cursor-pointer"></v-icon>
                <!-- search campaign field -->
                <v-text-field
                  v-if="toggleCamp"
                  v-model="searchCampText"
                  prepend-inner-icon="mdi-magnify"
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
      <td class="font-semibold pl-8">
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
                      v-if="!searchNews"
                      @click="toggleSearchNews()"
                      start
                      size="large"
                      class="my-auto cursor-pointer"></v-icon>
                    <!-- sub: search newsletter field -->
                    <v-text-field
                      v-if="searchNews"
                      prepend-inner-icon="mdi-magnify"
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
const toggleCamp = ref(false);
const searchNews = ref(false);
const updatePath = ref("");
const compName = ref("");
const campaignsList = ref([]);
const expanded = ref([]);
const items_per_page = ref([1, 5, 10, 15, 20, -1]);
const headers = ref([
  {
    title: "Nom:",
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
  toggleCamp.value = !toggleCamp.value;
}
function toggleSearchNews() {
  searchNews.value = !searchNews.value;
}
async function getCompany() {
  const data = await $apiSamarkand.getOneCompany(route.params.id);
  compName.value = data["name"];
}

/**
 * Asynchronously retrieves the list of campaigns.
 * Filters campaigns by company ID if there is one in route.
 * Otherwise, retrieves ALL campaigns.
 */
async function getCampaignsList() {
  try {
    getCompany();
    let criteria = {};
    if (route.params.id != "index") {
      criteria = {
        company: `${route.params.id}`,
        "groups[]": ["campaign:read", "newsletter-info", "timestampable:read"],
      };
    } else {
      criteria = {
        "groups[]": ["campaign:read", "newsletter-info", "timestampable:read"],
      };
    }

    const tempData = await $apiSamarkand.getAllCampaigns(criteria);
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
function nemCampaign() {
  navigateTo("/campaigns/add/" + route.params.id);
}
getCampaignsList();
</script>
