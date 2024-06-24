<template>
  <div class="p-4 mb-10 border-sm rounded-lg">
    <!-- LOGO -->
    <img
      v-if="company.images && company.images.length > 0"
      class="w-40 mx-auto"
      :src="company.images[0]"
      alt="logo"
    />
    <!-- NUMBERS OF CAMPAIGNS -->
    <p class="mt-4">
      campaigns: {{ company.campaigns ? company.campaigns.length : "X" }}
    </p>
    <!-- NUMBERS OF NEWSLETTERs -->
    <!-- todo can't acces to the information. need an other v-for ?? -->
    <p class="mt-2">
      newsletters:
      {{
        company.campaigns && company.campaigns.newsletters
          ? company.campaigns.newsletters.length
          : "X"
      }}
    </p>
    <span class="flex justify-between mt-4">
      <!-- link to dell page -->
      <Ubutton
        _label="supprimer"
        _borderColor="border-red-600"
        _bgHover="hover:bg-red-700"
      />
      <!-- link to modify page -->
      <Ubutton _label="modifier" _borderColor="border-validation-success" />
    </span>
  </div>
</template>

<script setup>
import Ubutton from "../components/U-nuxtLinkBtn.vue";

const props = defineProps({
  company: Object,
});
</script>
