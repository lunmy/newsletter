<template>
  <div class="p-4 mb-10 w-64 h-80 border-sm rounded-lg">
    <img class="w-40 mx-auto" :src="_imageSrc" alt="auchan logo" />
    <p class="mt-4">campaigns: 12</p>
    <p class="mt-2">newsletters: 145</p>
    <span class="flex justify-between mt-4">
      <Ubutton
        _label="supprimer"
        _bgColor="bg-red-600"
        _bgHover="hover:bg-red-800"
      />
      <Ubutton _label="modifier" />
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
});
</script>
