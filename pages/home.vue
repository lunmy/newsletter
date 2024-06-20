<template>
  <div class="bg-slate-700 d-flex">
    <img src="@/public/imgTest/logo.svg" alt="" />

    <span class="d-flex align-center mx-auto">
      <p class="text-white">Marques</p>
      <p class="m-4 text-white">/</p>
      <p class="text-white">NewsLetters</p>
    </span>
  </div>
</template>

<script setup>
import { getStorage } from "@/composables/storage";

const router = useRouter();
definePageMeta({
  middleware: ["auth"],
});
const logintxt = ref("");
logintxt.value = getStorage("login");
</script>
