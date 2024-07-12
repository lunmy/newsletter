<template>
  <div v-if="loading" class="text-center pt-20">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else>
    <v-row class="filter__quote">
      <v-col cols="10" class="flex items-center justify-end">
        <v-text-field
            v-model="criteria.name"
            :disabled="loading"
            placeholder="Rechercher une campagne"
            prepend-inner-icon="mdi-search"
            clear-icon="mdi-close-circle"
            rounded-full
            variant="solo-filled"
            hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="flex items-center justify-end">
        <nuxt-link to="/campaigns/add" class="w-full">
          <v-btn
              :disabled="loading"
              class="w-full"
              color="primary-0"
              text-color="white"
              prepend-icon="mdi-bullhorn"
          >Ajouter une campagne
          </v-btn>
        </nuxt-link>
      </v-col>
    </v-row>
    <v-data-table-server
        v-model:expanded="expanded"
        :headers="headers"
        :items="campaignsList"
        show-expand
        :loading="loading"
        :items-length="totalItems"
        v-model:items-per-page="criteria.itemsPerPage"
        :items-per-page-options="[5, 10, 15, 20]"
        item-value="@id"
        @update:options="getCampaignsList"
    >
      <!-- items: 'campaings'  -->
      <template v-slot:item.name="{ item }">
        <td class="font-semibold pl-8">
          - {{ item.name }} ({{ item["newsletters"].length }})
        </td>
      </template>
      <template v-slot:item.image="{ item }">
        <nuxt-img :src="item['images'][0]" class="w-24" />
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="mt-3" color="primary-900"  @click="createNewsletter(item)"><v-icon>mdi-plus</v-icon> Newsletter</v-btn>
        <v-btn class="mt-3" color="primary-0"  @click="editCampaign(item)"><v-icon>mdi-pencil</v-icon> Modifier</v-btn>
        <v-btn class="my-3" color="validation-error" @click.prevent="deleteCampaign(item)"><v-icon>mdi-delete</v-icon> Supprimer</v-btn>
      </template>
      <!-- EXPANDED ROW -->
      <template v-slot:expanded-row="{ item }">
        <tr>
          <td colspan="4">
        <!-- sub: table -->
        <v-data-table
            :items="item['newsletters']"
            :headers="subHeaders"
            hide-default-footer
            items-per-page="-1">

          <!-- items: 'newsletters name' -->
          <template v-slot:item.name="{ item }">
            <NuxtLink
                :to="'/newsletters/view/' + getIdFromIri(item['@id'])"
                class="pl-16">
              -{{ item.name.toUpperCase() }}
            </NuxtLink>
          </template>
          <!-- items: 'newsletters createdAt' -->
          <template v-slot:item.createdAt="{ item }">
            {{ $moment(item.createdAt).format("DD/MM/YYYY") }}
          </template>
        </v-data-table>
          </td>
        </tr>
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
  <v-dialog v-model="addNewsletterPopup" max-width="600">
    <v-card>
      <v-card-title class="text-h5"> Nouvelle newsletter</v-card-title>
      <v-card-text>
        <v-text-field
            v-model="newsletter.name"
            :disabled="loading"
            label="Nom de la newsletter"
            prepend-inner-icon="mdi-search"
            clear-icon="mdi-close-circle"
            variant="outlined"
            hide-details
        ></v-text-field>
        <v-text-field
            v-model="newsletter.subject"
            :disabled="loading"
            label="Nom de la newsletter"
            prepend-inner-icon="mdi-search"
            clear-icon="mdi-close-circle"
            variant="outlined"
            hide-details
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            :loading="loading"
            color="green darken-1"
            @click="addNewsletterPopup = false"
        >
          Annuler
        </v-btn>
        <v-btn
            :loading="loading"
            color="red darken-1"
            @click="addNewseletter"
        >
          Ajouter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import {errorToast, successToast} from "@/composables/toast";
import {getIdFromIri} from "~/composables/utils.js";

const router = useRouter();
const config = useRuntimeConfig();
const { $apinewsletter } = useNuxtApp();
const timer = ref(null);

const totalItems = ref(0);
const loading = ref(true);
const campaignsList = ref([]);
const expanded = ref([]);
const itemToDelete = ref({});
const shopDeletePopup = ref(false);
const addNewsletterPopup = ref(false);
const newsletter = ref({
  name: "",
  campaign: null,
  subject: null,
  content: null,
});

const criteria = ref({
  company: config.public.DEFAULT_COMPANY_ID,
  "groups[]": ["campaign:read", "company:details"],
  name: null,
  status: ['IN_PROGRESS'],
  page: 1,
  itemsPerPage: 20,
});

const headers = ref([
  {
    key: "data-table-expand",
    value: 'data-table-expand',
  },
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

const subHeaders = ref([
  {
    title: "Newsletter:",
    key: "name",
    value: "name",
  },

  {
    title: "Date:",
    key: "createdAt", // date here
    value: "createdAt",
  },
]);

watch(criteria, (data) => {
  console.log(data)
  if(data.name !== null && data.name !== "") {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      getCampaignsList({page: data.page, itemsPerPage: data.itemsPerPage});
    }, 1000)
  }

}, {deep: true});


async function getCampaignsList({ page, itemsPerPage, sortBy }) {
  try {
    criteria.value.page = page;
    criteria.value.itemsPerPage = itemsPerPage;
    const companies = await $apinewsletter.getAllCampaigns(criteria.value);
   campaignsList.value = companies["hydra:member"];
    totalItems.value = companies["hydra:totalItems"];
   // console.log(campaignsList.value)
    loading.value = false;
  } catch (error) {
    console.log(error)
    errorToast(error);
  }
}

getCampaignsList({
  page: 1,
  itemsPerPage: 20
});

function editCampaign(item)
{
  navigateTo(`/campaigns/${getIdFromIri(item['@id'])}/edit`);
}
function deleteCampaign(item)
{
  itemToDelete.value = item;
  shopDeletePopup.value = true;
}
async function deleteIt(item)
{
  try{
    loading.value = true;
    shopDeletePopup.value = false;

    await $apinewsletter.deleteCampaign(item);
    successToast("Campagne supprimée");
    await getCampaignsList({page: 1, itemsPerPage: 20});
  }
  catch (error) {
   console.log(error);
    errorToast(error);
  }
}

function createNewsletter(campaign)
{
  newsletter.value.campaign = campaign['@id'];
  addNewsletterPopup.value = true;
}
</script>
