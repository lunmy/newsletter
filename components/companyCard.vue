<template>
  <!-- loader -->
  <div
    v-if="loading"
    class="p-4 mb-10 w-64 h-80 border-sm rounded-lg shadow-lg d-flex flex-col"
  >
    <v-skeleton-loader
      class="mx-auto w-64 h-80 rounded-lg"
      elevation="8"
      type="text, image, list-item-two-line, button, button"
    >
    </v-skeleton-loader>
  </div>

  <!-- card -->
  <div
    v-else
    class="p-4 mb-10 w-64 h-80 border-sm rounded-lg shadow-lg d-flex flex-col"
  >
    <nuxt-link class="h-5/6" :to="campaignPath">
      <p class="h-1/5 text-center border-b border-gray-300">
        {{ company.name }}
      </p>
      <!-- LOGO -->
      <img
        v-if="company.images && company.images.length > 0"
        class="h-2/5 mx-auto"
        :src="company.images"
        alt="logo"
      />
      <span class="h-2/5">
        <!-- NUMBERS OF CAMPAIGNS -->
        <p class="mt-4 text-center">
          campaigns: {{ company.campaigns ? company.campaigns.length : "X" }}
        </p>
        <!-- NUMBERS OF NEWSLETTERS -->
        <p class="mb-4 mt-2 text-center">
          newsletters:
          {{ newsletters }}
        </p>
      </span>
    </nuxt-link>
    <span class="h-1/6 flex justify-between pt-4 border-t border-gray-300">
      <!-- link to dell page -->
      <Ubutton
        _label="supprimer"
        _borderColor="border-red-600"
        _bgHover="hover:bg-red-700"
        :_path="deletePath"
      />
      <!-- link to modify page -->
      <Ubutton
        _label="modifier"
        _borderColor="border-validation-success"
        :_path="updatePath"
      />
    </span>
  </div>
</template>

<script setup>
import Ubutton from "./linkBtn.vue";
import { getIdFromIri } from "@/composables/utils";

const newsletters = ref(0);
const updatePath = ref("");
const deletePath = ref("");
const campaignPath = ref("");
//list of campaigns: [{idCampaign: [idNewsletters, ...]}, ...]
const campaignList = ref([]);
const loading = ref(true);
const props = defineProps({
  company: Object,
});

onMounted(() => {
  const companyId = getIdFromIri(props.company["@id"]);
  campaignPath.value = "/campaigns/view/" + companyId;
  deletePath.value = "/company/delete/" + companyId;
  updatePath.value = "/company/update/" + companyId;
  if (props.company.campaigns && props.company.campaigns.length > 0) {
    props.company.campaigns.forEach((campaign) => {
      newsletters.value += campaign.newsletters.length;
      let campaignID = getIdFromIri(campaign["@id"]);
      let campaignNews = {};
      campaignNews[campaignID] = [];
      campaign.newsletters.forEach((newsletter) => {
        campaignNews[campaignID].push(getIdFromIri(newsletter));
      });
      campaignList.value.push(campaignNews);
    });
  }
  loading.value = false;
});
</script>
