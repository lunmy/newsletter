<template>
  <div class="bg-slate-700 d-flex">
    <img src="@/public/img/logo.svg" alt="" />

    <span class="d-flex align-center mx-auto">
      <p class="text-white">Marques</p>
      <p class="m-4 text-white">/</p>
      <p class="text-white">NewsLetters</p>
    </span>
  </div>
  <div class="container mx-auto p-10 grid grid-cols-6 gap-6">
    <brandCard _imageSrc="/img/auchan.svg" />
    <brandCard _imageSrc="/img/courir.svg" />
    <brandCard _imageSrc="/img/courtepaille.svg" />
    <brandCard _imageSrc="/img/dps.svg" />
    <brandCard _imageSrc="/img/macsf.svg" />
    <brandCard _imageSrc="/img/parcAsterix.svg" />
    <brandCard _imageSrc="/img/sakara.svg" />
    <brandCard _imageSrc="/img/sakara.svg" />
    <brandCard _imageSrc="/img/sakara.svg" />
  </div>
</template>

<script setup>
import brandCard from "~/components/C-BrandCard.vue";

definePageMeta({
  middleware: ["auth"],
});
</script>
