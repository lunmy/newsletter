<template>
  <h1 class="p-4 text-2xl font-bold text-center">Ajouter un template</h1>
  <template-form
      :template="template"
      :loading="loading"
      @submit="createTemplate" />
</template>
<script setup>
import templateForm from "~/components/templateForm.vue";
const config = useRuntimeConfig();
const { $apinewsletter } = useNuxtApp();
const template = ref({
  name: "",
  content: "",
  company: `/companies/${config.public.DEFAULT_COMPANY_ID}`,
});
const loading = ref(false);

async function createTemplate(template){
  loading.value = true;
  try {
    await $apinewsletter.createTemplate(template);
    successToast("Template ajouté");
    navigateTo('/template')
  } catch (error) {
    console.log("error:", error);
  }
  loading.value = false;
}
</script>
