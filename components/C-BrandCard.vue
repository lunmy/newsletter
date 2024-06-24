<template>
  <div class="p-4 mb-10 border-sm rounded-lg">
    <img class="w-40 mx-auto" :src="_imageSrc" alt="auchan logo" />
    <p class="mt-4">campaigns: {{ _campaignX }}</p>
    <p class="mt-2">newsletters: {{ _newsX }}</p>
    <span class="flex justify-between mt-4">
      <Ubutton
        _label="supprimer"
        _borderColor="border-red-600"
        _bgHover="hover:bg-red-700"
      />
      <Ubutton _label="modifier" _borderColor="border-validation-success" />
    </span>
  </div>
</template>

<script setup>
import Ubutton from "../components/U-nuxtLinkBtn.vue";

const props = defineProps({
  _imageSrc: {
    type: String,
    required: false,
    default: "/img/logo.svg",
  },
  _campaignX: {
    type: Number,
    required: false,
    default: 0,
  },
  _newsX: {
    type: Number,
    required: false,
    default: 0,
  },
});
</script>
