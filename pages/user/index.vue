<template>
  <v-row class="filter__quote">
    <v-col cols="10" class="flex items-center justify-end">
      <v-text-field
          v-model="criteria.email"
          :disabled="loading"
          placeholder="Rechercher un utilisateur"
          prepend-inner-icon="mdi-search"
          clear-icon="mdi-close-circle"
          rounded-full
          variant="solo-filled"
          hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="flex items-center justify-end">
      <nuxt-link to="/user/create" class="w-full">
        <v-btn
            :disabled="loading"
            class="w-full"
            color="primary-0"
            text-color="white"
            prepend-icon="mdi-square-rounded-outline"
        >Ajouter un utilisateur
        </v-btn>
      </nuxt-link>
    </v-col>
  </v-row>
  <div v-if="loading" class="text-center pt-3">
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
  </div>
  <div v-else>
    <v-data-table-server
        :headers="headers"
        :items="users"
        :loading="loading"
        :items-length="totalItems"
        v-model:items-per-page="criteria.itemsPerPage"
        :items-per-page-options="[5, 10, 15, 20]"
        item-value="@id"
        @update:options="getUsers"
    >
      <template v-slot:item.roles="{ item }">
        {{ formatRoles(item.roles) }}
      </template>
      <template v-slot:item.action="{ item }">
        <NuxtLink :to="`/user/${getIdFromIri(item['@id'])}/edit`">
          <v-btn class="mt-3" color="primary-0">
            <v-icon>mdi-pencil</v-icon>
            Modifier
          </v-btn>
        </NuxtLink>

        <v-btn v-if="!item.isMe" class="my-3" color="validation-error" @click.prevent="deleteObject(item)">
          <v-icon>mdi-delete</v-icon>
          Supprimer
        </v-btn>
      </template>
    </v-data-table-server>
  </div>
  <v-dialog v-model="shopDeletePopup" max-width="600">
    <v-card>
      <v-card-title class="text-h5"> Suppression</v-card-title>
      <v-card-text>
        Etes-vous sûr de vouloir supprimer cet élément ? <br/><br/>
        <strong>{{ itemToDelete.name }}</strong>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            :loading="loading"
            color="green darken-1"
            @click="shopDeletePopup = false"
        >
          NON
        </v-btn>
        <v-btn
            :loading="loading"
            color="red darken-1"
            text
            @click="deleteIt(itemToDelete['@id'])"
        >
          OUI
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import {getIdFromIri} from "~/composables/utils";
import {userRoles} from "~/composables/referenceValues";
import {useCookie} from "nuxt/app";
import jwtDecode from "jwt-decode";
const config = useRuntimeConfig();
const {$apinewsletter} = useNuxtApp();
const timer = ref(null);
const totalItems = ref(0);
const users = ref([]);
const itemToDelete = ref({});
const shopDeletePopup = ref(false);
const loading = ref(false);

const criteria = ref({
  page: 1,
  email: null,
  itemsPerPage: 20
});

const headers = ref([
  {
    title: "Email",
    key: "email",
    align: "left",
    sortable: true,
  },
  {
    title: "Prénom",
    key: "firstname",
    align: "left",
    sortable: true,
  },
  {
    title: "Nom",
    key: "lastname",
    align: "left",
    sortable: true,
  },
  {
    title: "Role",
    key: "roles",
    align: "left",
    sortable: true,
  },
  {
    title: "Actions:",
    key: "action",
    value: "action",
    align: "left",
    sortable: false,
    width: "200px",
  },
]);

onMounted(async () => {
})

watch(criteria, (data) => {
  console.log(data)
  if (data.email !== null && data.email !== "") {
    clearTimeout(timer.email)
    timer.value = setTimeout(() => {
      loading.value = true;
      getUsers({page: data.page, itemsPerPage: data.itemsPerPage, email: data.email});
    }, 1000)
  }

}, {deep: true});

async function getUsers({page, itemsPerPage, sortBy}) {
  try {
    criteria.value.page = page;
    criteria.value.itemsPerPage = itemsPerPage;
    const objects = await $apinewsletter.getAllUsers(criteria.value);
    users.value = objects["hydra:member"];
    totalItems.value = objects["hydra:totalItems"];
    const decoded = await getUserInfos()
    if(decoded) {
      users.value.forEach((user) => {
        const id = getIdFromIri(user['@id'])
        user.isMe = id === decoded.id;
      })
    }

    loading.value = false;
  } catch (error) {
    console.log(error)
    errorToast(error);
  }
}

function formatRoles(roles) {
  if (roles.includes("ROLE_USER") && roles.length > 1) {
    roles.splice(roles.indexOf("ROLE_USER"), 1);
  }
  roles = roles.map((role) => role.replace("ROLE_", ""));

  roles = roles.map((role) => {
    return userRoles().find((userRole) => userRole.key === role).label;
  });

  return roles.join(", ");
}

function deleteObject(item) {
  itemToDelete.value = item;
  shopDeletePopup.value = true;
}

async function deleteIt(item) {
  try {
    loading.value = true;
    shopDeletePopup.value = false;

    await $apinewsletter.deleteUser(item);
    successToast("Utilisateur supprimé");
    await getUsers({page: 1, itemsPerPage: 20});
  } catch (error) {
    console.log(error);
    errorToast(error);
  }
  loading.value = false;
}
</script>
