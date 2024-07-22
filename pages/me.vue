<template>
  <h1 class="p-4 text-2xl font-bold text-center">Modifier mon compte</h1>
  <div v-if="user !== null">
    <user-form
        :user="user"
        :roles="roles"
        :companies="companies"
        :loading="loading"
        @submit="updateUser"/>
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
  const tmpUser = await getUserInfos();
  if (tmpUser !== null && tmpUser !== undefined) {
    user.value = await $apinewsletter.getOneUser(tmpUser.id);
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
</script>
