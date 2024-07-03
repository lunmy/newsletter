<template>
  <div
    class="p-4 mb-10 w-64 border-sm rounded-lg shadow-lg d-flex flex-col justify-between"
  >
    <!-- todo add name of company ?? -->
    <!-- LOGO -->
    <img
      v-if="company.images && company.images.length > 0"
      class="h-28 mx-auto"
      :src="company.images"
      alt="logo"
    />
    <div>
      <!-- NUMBERS OF CAMPAIGNS -->
      <p class="mt-4 text-center">
        campaigns: {{ company.campaigns ? company.campaigns.length : "X" }}
      </p>
      <!-- NUMBERS OF NEWSLETTERS -->

      <p class="mt-2 mb-4 text-center">
        newsletters:
        {{ newsletters }}
      </p>

      <span class="flex justify-between pt-4 border-t border-gray-300">
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
  </div>
</template>

<script setup>
import Ubutton from "./linkBtn.vue";
import { getIdFromIri } from "@/composables/utils";

const newsletters = ref(0);
let updatePath = ref("");
let deletePath = ref("");
const props = defineProps({
  company: Object,
});
onMounted(() => {
  deletePath.value = "/company/delete/" + getIdFromIri(props.company["@id"]);
  updatePath.value = "/company/update/" + getIdFromIri(props.company["@id"]);
  if (props.company.campaigns && props.company.campaigns.length > 0) {
    props.company.campaigns.forEach((campaign) => {
      newsletters.value += campaign.newsletters.length;
    });
  }
});
</script>
