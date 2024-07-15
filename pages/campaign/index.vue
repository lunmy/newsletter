<template>
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
      <nuxt-link to="/campaign/create" class="w-full">
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
        v-model:expanded="expanded"
        :headers="headers"
        :items="campaigns"
        show-expand
        :loading="loading"
        :items-length="totalItems"
        v-model:items-per-page="criteria.itemsPerPage"
        :items-per-page-options="[5, 10, 15, 20]"
        item-value="@id"
        @update:options="getCampaigns"
    >
      <!-- items: 'campaings'  -->
      <template v-slot:item.name="{ item }">
        <td class="font-semibold pl-8">
          - {{ item.name }} ({{ item["newsletters"].length }})
        </td>
      </template>
      <template v-slot:item.image="{ item }">
        <nuxt-img :src="item['images'][0]" class="w-24"/>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="mt-3" color="primary-900" @click="createNewsletter(item)">
          <v-icon>mdi-plus</v-icon>
          Newsletter
        </v-btn>
        <nuxt-link :to="`/campaign/${getIdFromIri(item['@id'])}/edit`">
        <v-btn class="mt-3" color="primary-0">
          <v-icon>mdi-pencil</v-icon>
          Modifier
        </v-btn>
        </nuxt-link>
        <v-btn class="my-3" color="validation-error" @click.prevent="deleteObject(item)">
          <v-icon>mdi-delete</v-icon>
          Supprimer
        </v-btn>
      </template>
      <!-- EXPANDED ROW -->
      <template v-slot:expanded-row="{ item }">
        <tr class="bg-dialog-0">
          <td colspan="4" >
            <!-- sub: table -->
            <v-data-table
                class="bg-dialog-0"
                :items="item['newsletters']"
                :headers="subHeaders"
                hide-default-footer
                items-per-page="-1">
              <template v-slot:item.name="{ item }">
                  {{ item.name.toUpperCase() }}
              </template>
              <template v-slot:item.createdAt="{ item }">
                {{ $moment(item.createdAt).format("DD/MM/YYYY") }}
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn class="mt-3" color="primary-0" @click="navigateTo(`/newsletter/${getIdFromIri(item['@id'])}/edit`)">
                  <v-icon>mdi-pencil</v-icon>
                  Modifier
                </v-btn>
                <v-btn class="my-3" color="validation-error" @click.prevent="deleteObject(item)">
                  <v-icon>mdi-delete</v-icon>
                  Supprimer
                </v-btn>
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
    <div class="bg-slate-400">
      <create-newsletter-form
          :newsletter="newsletter"
          :templates="newsletterTemplates"
          :campaigns="newslettersCampaigns"
          @close="addNewsletterPopup = false"
          @submit="addNewsletter"
      />
    </div>
  </v-dialog>
</template>

<script setup>
import createNewsletterForm from "~/components/createNewsletterForm.vue";
import {errorToast, successToast} from "@/composables/toast";
import {getIdFromIri} from "~/composables/utils.js";
import CreateNewsletterForm from "~/components/createNewsletterForm.vue";

const config = useRuntimeConfig();
const {$apinewsletter} = useNuxtApp();
const timer = ref(null);
const totalItems = ref(0);
const loading = ref(true);
const campaigns = ref([]);
const expanded = ref([]);
const itemToDelete = ref({});
const shopDeletePopup = ref(false);
const addNewsletterPopup = ref(false);
const newslettersCampaigns = ref([]);
const newsletterTemplates = ref([]);
const newslettersCampaignsCriterias = ref({
  page: 1,
  itemsPerPage: 20,
  name: null,
});
const newslettersTemplatesCriterias = ref({
  page: 1,
  itemsPerPage: 20,
  name: null,
});


const newsletter = ref({
  name: "",
  campaign: null,
  subject: null,
  content: null,
  template: null,
});

const criteria = ref({
  company: config.public.DEFAULT_COMPANY_ID,
  "groups[]": ["campaign:read", "company:details", 'newsletter-info'],
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
  {
    key: "action",
    value: "action",
    align: "left",
    sortable: false,
    width: "200px",
  },
]);

watch(criteria, (data) => {
  if (data.name !== null && data.name !== "") {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      loading.value = true;
      getCampaigns({page: data.page, itemsPerPage: data.itemsPerPage});
    }, 1000)
  }

}, {deep: true});


async function getCampaigns({page, itemsPerPage, sortBy}) {
  try {
    criteria.value.page = page;
    criteria.value.itemsPerPage = itemsPerPage;
    const companies = await $apinewsletter.getAllCampaigns(criteria.value);
    campaigns.value = companies["hydra:member"];
    totalItems.value = companies["hydra:totalItems"];
    // console.log(campaigns.value)
    loading.value = false;
  } catch (error) {
    console.log(error)
    errorToast(error);
  }
}

getCampaigns({
  page: 1,
  itemsPerPage: 20
});
onMounted(async () => {
  try {
    newsletterTemplates.value = (await $apinewsletter.getAllTemplates(newslettersTemplatesCriterias.value))["hydra:member"];
    console.log(newsletterTemplates.value)
    newslettersCampaigns.value = (await $apinewsletter.getAllCampaigns(newslettersCampaignsCriterias.value))["hydra:member"];
  } catch (error) {
    console.log(error)
    errorToast(error);
  }
})
function deleteObject(item) {
  itemToDelete.value = item;
  shopDeletePopup.value = true;
}

async function deleteIt(item) {
  try {
    loading.value = true;
    shopDeletePopup.value = false;

    await $apinewsletter.deleteCampaign(item);
    successToast("L'élément a bien été supprimé");
    await getCampaigns({page: 1, itemsPerPage: 20});
  } catch (error) {
    console.log(error);
    errorToast(error);
  }
}

function createNewsletter(campaign) {
  newsletter.value.campaign = campaign;
  addNewsletterPopup.value = true;
}

async function addNewsletter(newsletter) {
  try {
    addNewsletterPopup.value = false;
    const obj = {
      name: newsletter.name,
      subject: newsletter.subject,
      content: newsletter.template.content,
      campaign: newsletter.campaign['@id'],
      variables: newsletter.template.variables
    }
    const createdNewsletter = await $apinewsletter.createNewsletter(obj);
    successToast("Newsletter créée");
    navigateTo(`/newsletter/${getIdFromIri(createdNewsletter['@id'])}/edit`)
  } catch (error) {
    console.log(error);
    errorToast(error);
  }
}

</script>
