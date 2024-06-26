<template>
  <div class="p-4 mb-10 border-sm rounded-lg">
    <!-- LOGO -->
    <img v-if="company.images && company.images.length > 0" class="w-40 mx-auto" :src="company.images[0]" alt="logo" />
    <!-- NUMBERS OF CAMPAIGNS -->
    <p class="mt-4">
      campaigns: {{ company.campaigns ? company.campaigns.length : "X" }}
    </p>
    <!-- NUMBERS OF NEWSLETTERS -->

    <p class="mt-2">
      newsletters:
      {{ newsletters }}
    </p>
    <span class="flex justify-between mt-4">
      <!-- link to dell page -->
      <Ubutton _label="supprimer" _borderColor="border-red-600" _bgHover="hover:bg-red-700" />
      <!-- link to modify page -->
      <Ubutton _label="modifier" _borderColor="border-validation-success" :_path=updatePath />
    </span>
  </div>
</template>

<script setup>
import Ubutton from "../components/U-nuxtLinkBtn.vue";
import { getIdFromIri } from "@/composables/utils";

const newsletters = ref(0);
let updatePath = ref('')
const props = defineProps({
  company: Object,
});
onMounted(() => {
  updatePath.value = '/company/update/' + getIdFromIri(props.company["@id"])
  if (props.company.campaigns && props.company.campaigns.length > 0) {
    props.company.campaigns.forEach((campaign) => {
      newsletters.value += campaign.newsletters.length;
    });
  }
});
</script>
