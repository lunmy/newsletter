<template>
  <h1 class="p-4 text-2xl font-bold text-center">Modifier un bloc</h1>
  <div  v-if="block !== null">
  <block-form
      :block="block"
      :loading="loading"
      @submit="updateBlock" />
  </div>
</template>
<script setup>
import blockForm from "~/components/blockForm.vue";
const route = useRoute();
const { $apinewsletter } = useNuxtApp();
const block=ref(null);
const loading = ref(false);



onMounted(async () => {
  if (route.params.id !== null && route.params.id !== undefined) {
    block.value = await $apinewsletter.getOneBlock(route.params.id);
  }
})


async function updateBlock(data) {
  loading.value = true;
  try {
    await $apinewsletter.updateBlock(data);
    successToast("Bloc modifié");
    navigateTo('/block')
  } catch (error) {
    console.log("error:", error);
  }
  loading.value = false;
}

</script>
