<template>
  <h1 class="p-4 text-2xl font-bold text-center">Ajouter un utilisateur</h1>
  <div v-if="user !== null">
    <user-form
        :user="user"
        :roles="roles"
        :companies="companies"
        :managers="managers"
        :loading="loading"
        @submit="createUser"
    />
  </div>
</template>
<script setup>
import UserForm from "~/components/userForm.vue";
import {userRoles} from "~/composables/referenceValues.js";
import {getUserInfos, isGranted} from "~/composables/utils.js";

const {$apinewsletter} = useNuxtApp();
const user = ref({
  firstname: "Jean",
  lastname: "Dupont",
  email: "jean.dupont@lunamy.com",
  roles: [],
  companies: [],
  manager: null
});
const loading = ref(false);
const roles = ref([]);
const companies = ref([]);
const managers = ref([]);

onMounted(async () => {
  userRoles().forEach((role) => {
    if (isGranted('ROLE_' + role.key)) {
      roles.value.push({
        label: role.label,
        key: 'ROLE_' + role.key
      })
    }
  })
  if (isGranted('ROLE_SUPER_ADMIN')) {
    companies.value = await $apinewsletter.getAllCompanies({page: 1, all: true})
    managers.value = await $apinewsletter.getAllUsers({page: 1, all: true})

  } else {
    const currentUser = await getUserInfos();
    if (currentUser) {
      if (currentUser.companies && currentUser.companies.length > 0) {
        currentUser.companies.map(async (company) => {
          const cp = await $apinewsletter.getOneCompany(company);
          companies.value.push(cp)
        })
      }
      managers.value = [await $apinewsletter.getOneUser(currentUser.id)];
      user.value.manager = managers.value[0].id
    }
  }
})

async function createUser(data) {
  loading.value = true;
  try {
    data.username = data.email;
    data.password = 'password';
    await $apinewsletter.createUser(data);
    successToast("Utilisateur Ajouté");
    navigateTo("/user");
  } catch (error) {
    errorToast("Impossible d'ajouter l'utilisateur");
    console.log("error:", error);
  }
  loading.value = false;
}
</script>
