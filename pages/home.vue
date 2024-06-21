<template>
  <div class="bg-slate-700 d-flex">
    <img src="@/public/imgTest/logo.svg" alt="" />

    <span class="d-flex align-center mx-auto">
      <p class="text-white">Marques</p>
      <p class="m-4 text-white">/</p>
      <p class="text-white">NewsLetters</p>
    </span>
  </div>
  <div class="container">
    <Ubutton _label="modifier" _bgColor="bg-slate-400" />
    <!-- _bgHover="bg-slate-800" -->
  </div>
</template>

<script setup>
import Ubutton from "~/components/U-nuxtLinkBtn.vue";

definePageMeta({
  middleware: ["auth"],
});
</script>
