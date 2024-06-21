<template>
  <div class="bg-slate-700 d-flex">
    <img src="@/public/img/logo.svg" alt="" />

    <span class="d-flex align-center mx-auto">
      <p class="text-white">Marques</p>
      <p class="m-4 text-white">/</p>
      <p class="text-white">NewsLetters</p>
    </span>
  </div>
  <div class="container p-10 d-flex justify-evenly">
    <brandCard />
    <brandCard />
    <brandCard />
  </div>
</template>

<script setup>
import brandCard from "~/components/C-BrandCard.vue";

definePageMeta({
  middleware: ["auth"],
});
</script>
