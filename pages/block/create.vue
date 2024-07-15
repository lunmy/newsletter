<template>
  <h1 class="p-4 text-2xl font-bold text-center">Ajouter un bloc</h1>
  <block-form
      :block="block"
      :loading="loading"
      @submit="createBlock" />
</template>
<script setup>
import blockForm from "~/components/blockForm.vue";
const config = useRuntimeConfig();
const { $apinewsletter } = useNuxtApp();
const block = ref({
  name: "",
  content: "",
  images: [],
  company: `/companies/${config.public.DEFAULT_COMPANY_ID}`,
});
const loading = ref(false);

async function createBlock(block){
  loading.value = true;
  try {
    await $apinewsletter.createBlock(block);
    successToast("Block ajouté");
    navigateTo('/block')
  } catch (error) {
    console.log("error:", error);
  }
  loading.value = false;
}
</script>
