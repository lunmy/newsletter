<template>
  <h1 class="p-4 text-2xl font-bold text-center">Modifier un utilisateur</h1>
  <div v-if="user !== null">
    <user-form
        :user="user"
        :roles="roles"
        :companies="companies"
        :loading="loading"
        @submit="updateUser"
        @reset="reset"
    />
  </div>
</template>
<script setup>
import UserForm from "~/components/userForm.vue";
import {userRoles} from "~/composables/referenceValues.js";
import {getUserInfos, isGranted} from "~/composables/utils.js";

const route = useRoute();
const {$apinewsletter} = useNuxtApp();
const user = ref(null);
const loading = ref(false);
const roles = ref([]);
const companies = ref([]);

onMounted(async () => {
  if (route.params.id !== null && route.params.id !== undefined) {
    user.value = await $apinewsletter.getOneUser(route.params.id);
  }
  userRoles().forEach((role) => {
    if (isGranted('ROLE_' + role.key)) {
      roles.value.push({
        label: role.label,
        key: 'ROLE_' + role.key
      })
    }
  })
  if (isGranted('ROLE_SUPER_ADMIN')) {
    const cp = await $apinewsletter.getAllCompanies({page:1, all: true});
    console.log(cp)
    companies.value = cp
  } else {

    const currentUser = await getUserInfos();
    if (currentUser) {
      if (currentUser.companies && currentUser.companies.length > 0) {
        currentUser.companies.map(async (company) => {
          const cp = await $apinewsletter.getOneCompany(company);
          companies.value.push(cp)
        })
      }
    }
  }
})

async function updateUser(data) {
  loading.value = true;
  try {
    await $apinewsletter.updateUser(data);
    successToast("Utilisateur modifié");
    navigateTo("/user");
  } catch (error) {
    console.log("error:", error);
  }
  loading.value = false;
}

async function reset(data) {
  try{
  const result = await $apinewsletter.resetPassword({email:data.email});
  if(result !== true){
    throw new Error("Impossible de réinitialiser le mot de passe");
  }
  successToast("Email de réinitialisation de mot de passe envoyé a " + data.email);
  navigateTo("/user");
  }
  catch(error){
    errorToast(error.message);
    console.log("error:", error);
  }
}

</script>
