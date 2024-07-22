<template>
  <v-row class="filter__quote">
    <v-col cols="10" class="flex items-center justify-end">
      <v-text-field
          v-model="criteria.name"
          :disabled="loading"
          placeholder="Rechercher un template"
          prepend-inner-icon="mdi-search"
          clear-icon="mdi-close-circle"
          rounded-full
          variant="solo-filled"
          hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="flex items-center justify-end">
      <nuxt-link to="/template/create" class="w-full">
        <v-btn
            :disabled="loading"
            class="w-full"
            color="primary-0"
            text-color="white"
            prepend-icon="mdi-square-rounded-outline"
        >Ajouter un template
        </v-btn>
      </nuxt-link>
    </v-col>
  </v-row>
  <div v-if="loading" class="text-center pt-3">
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2" ></div>
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
        :items="templates"
        :loading="loading"
        :items-length="totalItems"
        v-model:items-per-page="criteria.itemsPerPage"
        :items-per-page-options="[5, 10, 15, 20]"
        item-value="@id"
        @update:options="getTemplates"
    >
      <template v-slot:item.action="{ item }">
        <NuxtLink :to="`/template/${getIdFromIri(item['@id'])}/edit`">
          <v-btn class="mt-3" color="primary-0"><v-icon>mdi-pencil</v-icon> Modifier</v-btn>
        </NuxtLink>

        <v-btn class="my-3" color="validation-error" @click.prevent="deleteObject(item)"><v-icon>mdi-delete</v-icon> Supprimer</v-btn>
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

import {errorToast, successToast} from "~/composables/toast.js";
import {getIdFromIri} from "~/composables/utils.js";


const config = useRuntimeConfig();
const { $apinewsletter } = useNuxtApp();
const timer = ref(null);
const totalItems = ref(0);
const templates = ref([]);
const itemToDelete = ref({});
const shopDeletePopup = ref(false);
const loading = ref(false);

const criteria = ref({
  name: "",
  page: 1,
  itemsPerPage: 20
});

const headers = ref([
  {
    key: "image",
    value: 'image',
    width: "150px",
  },
  {
    title: "Nom:",
    key: "name",
    value: "name",
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
  await getTemplates({
    page: 1,
    itemsPerPage: 20
  });
})

watch(criteria, (data) => {
  console.log(data)
  if(data.name !== null && data.name !== "") {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      loading.value = true;
      getTemplates({page: data.page, itemsPerPage: data.itemsPerPage});
    }, 1000)
  }

}, {deep: true});

async function getTemplates({ page, itemsPerPage, sortBy }) {
  try {
    criteria.value.page = page;
    criteria.value.itemsPerPage = itemsPerPage;
    const objects = await $apinewsletter.getAllTemplates(criteria.value);
    templates.value = objects["hydra:member"];
    totalItems.value = objects["hydra:totalItems"];
    loading.value = false;
  } catch (error) {
    console.log(error)
    errorToast(error);
  }
}

function deleteObject(item)
{
  itemToDelete.value = item;
  shopDeletePopup.value = true;
}

async function deleteIt(item)
{
  try{
    loading.value = true;
    shopDeletePopup.value = false;

    await $apinewsletter.deleteTemplate(item);
    successToast("Template supprimé");
    await getTemplates({page: 1, itemsPerPage: 20});
  }
  catch (error) {
    console.log(error);
    errorToast(error);
  }
}
</script>
