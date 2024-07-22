<template>
  <div v-if="user !== null" class="w-3/4 mx-auto">
    <h2 class="text-2xl">Réinitialiser mon mot de passe</h2>
    <password-form @submit="updateUserPassword"/>
  </div>
</template>
<script setup>
import PasswordForm from "~/components/passwordForm.vue";
import {useAuthStore} from "~/store/auth";
const { logUserOut } = useAuthStore();

definePageMeta({
  layout: 'login',
  middleware: null
})
const {$apinewsletter} = useNuxtApp();
const route = useRoute();
const loading = ref(true);
const user = ref(null);


onMounted(async () => {
  if (route.params.id !== null && route.params.id !== undefined) {
    const token = await $apinewsletter.getToken(route.params.id);
    if (token) {
      user.value = token.user;
      loading.value = false;
    }
  }
})

async function updateUserPassword(password)
{
  logUserOut();
  loading.value = true;
  try
  {
    const result = await $apinewsletter.updateUserPassword(route.params.id, password.value);
    if(result !== true)
    {
      throw new Error("Impossible de modifier le mot de passe");
    }
    successToast("Mot de passe modifié");
    navigateTo("/");
  }
  catch (error)
  {
    console.log("error:", error);
    errorToast(error.message);
  }
  loading.value = false;
}

</script>
