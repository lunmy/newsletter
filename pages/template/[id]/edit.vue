<template>
  <h1 class="p-4 text-2xl font-bold text-center">Modifier un template</h1>
  <div  v-if="template !== null">
  <template-form
      :template="template"
      :loading="loading"
      @submit="updateTemplate" />
  </div>
</template>
<script setup>
import templateForm from "~/components/templateForm.vue";
const route = useRoute();
const { $apinewsletter } = useNuxtApp();
const template=ref(null);
const loading = ref(false);

onMounted(async () => {
  if (route.params.id !== null && route.params.id !== undefined) {
    template.value = await $apinewsletter.getOneTemplate(route.params.id);
  }
})

async function updateTemplate(data) {
  loading.value = true;
  try {
    await $apinewsletter.updateTemplate(data);
    successToast("Template modifié");
    navigateTo('/template')
  } catch (error) {
    console.log("error:", error);
  }
  loading.value = false;
}
</script>
