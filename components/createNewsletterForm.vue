<template>
  <v-card color="dialog-0">
    <v-card-title class="text-h5"> Nouvelle newsletter</v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
            v-model="props.newsletter.name"
            :disabled="loading"
            label="Nom de la newsletter"
            prepend-inner-icon="mdi-search"
            clear-icon="mdi-close-circle"
            variant="solo-filled"
            hide-details
            class="my-3"
            :rules="[textRule]"
        ></v-text-field>
        <v-text-field
            v-model="props.newsletter.subject"
            :disabled="loading"
            label="Sujet"
            prepend-inner-icon="mdi-search"
            clear-icon="mdi-close-circle"
            variant="solo-filled"
            hide-details
            class="my-3"
            :rules="[textRule]"
        ></v-text-field>
        <v-autocomplete
            :custom-filter="filterTemplates"
            v-model="props.newsletter.template"
            :items="props.templates"
            :loading="loading"
            item-title="name"
            item-value="@id"
            label="Template *"
            placeholder="Rechercher une template"
            prepend-inner-icon="mdi-square-rounded-outline"
            clearable
            dense
            variant="solo-filled"
            return-object
            :rules="[textRule]"
        >
          <template #selection="{ item }">
            <span>{{ item.title }}</span>
          </template>
        </v-autocomplete>
        <v-autocomplete
            :custom-filter="filterCampaigns"
            v-model="props.newsletter.campaign"
            :items="props.campaigns"
            :loading="loading"
            item-title="name"
            item-value="@id"
            label="Campagne *"
            placeholder="Rechercher une campagne"
            prepend-inner-icon="mdi-bullhorn-outline"
            clearable
            dense
            variant="solo-filled"
            return-object
            :rules="[textRule]"
        >
          <template #selection="{ item }">
            <span>{{ item.title }}</span>
          </template>
        </v-autocomplete>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          :loading="loading"
          color="red darken-1"
          @click="close()"
      >
        Annuler
      </v-btn>
      <v-btn
          :loading="loading"
          color="green darken-1"
          @click="submit"
      >
        Ajouter
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import {textRule} from "@/composables/rules";
import {variablesTypes} from "~/composables/referenceValues.js";

const emit = defineEmits(["submit", "close"]);
const form = ref(null);
const props = defineProps({
  newsletter: {
    type: Object,
  },
  campaigns: {
    type: Object,
  },
  templates: {
    type: Object,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

function close() {
  emit("close");
}

function filterCampaigns(itemTitle, queryText, item) {
  console.log(itemTitle, queryText, item)
}

function filterTemplates(itemTitle, queryText, item) {
  console.log(itemTitle, queryText, item)
}

function submit() {
  const validation = form.value.validate();
  validation.then(async (success) => {
    if (success.valid) {
      emit("submit", props.newsletter);
    }
    else{
      console.log("not valid")
    }
  })

}


</script>
