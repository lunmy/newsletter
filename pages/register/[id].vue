<template>
  <div v-if="user !== null" class="w-3/4 mx-auto">
    <h2 class="text-2xl">Créer mon mot de passe</h2>
    <password-form @submit="registerUser"/>
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
    user.value = await $apinewsletter.getRegistrationToken(route.params.id);
   //Azerty123456!
  }
})

async function registerUser(password)
{
  logUserOut();
  loading.value = true;
  try
  {
    const result = await $apinewsletter.register(
        route.params.id,
        {
          password: password.value,
        }
    );
    if(result === null)
    {
      throw new Error("Impossible de créer le mot de passe");
    }
    successToast("Mot de passe créé");
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
