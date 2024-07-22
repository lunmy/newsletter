<template>
  <v-container class="fluid">
    <div v-if="!loaded && props.user === null" class="space-y-4">
      <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse my-6 bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse bg-gray-300 h-10 w-full rounded-lg"></div>
    </div>
    <div v-else class="space-y-4">
      <v-form ref="form">
        <div class="grid grid-cols-2 gap-4">
          <v-text-field
              class="col-span-2"
              label="Email"
              variant="solo-filled"
              rounded="lg"
              v-model="props.user.email"
              :disabled="!isGranted('ROLE_SUPER_ADMIN')"
              :rules="[textRule]"></v-text-field>
          <v-text-field
              label="Prénom"
              variant="solo-filled"
              rounded="lg"
              v-model="props.user.firstname"
              :rules="[textRule]"></v-text-field>
          <v-text-field
              label="Nom"
              variant="solo-filled"
              rounded="lg"
              v-model="props.user.lastname"
              :rules="[textRule]"></v-text-field>
          <v-autocomplete
              v-model="props.user.roles"
              :items="props.roles"
              item-title="label"
              item-value="key"
              label="Role"
              single-line
              rounded="lg"
              required
              variant="solo-filled"
          ></v-autocomplete>
          <v-autocomplete
              v-model="props.user.companies"
              :items="props.companies"
              item-title="name"
              item-value="@id"
              label="Marques"
              variant="solo-filled"
              rounded="lg"
              multiple>
          </v-autocomplete>
          <v-select
              v-model="props.user.manager"
              :items="props.managers"
              item-value="@id"
              item-title="firstname + ' ' + lastname"
              label="Responsable"
              single-line
              rounded="lg"
              required
              variant="solo-filled"
          >
            <template #item="{ item, props }" >
              <v-list-item v-bind="props" :title="item.props.title.firstname + ' ' + item.props.title.lastname"/>
            </template>
            <template #selection="{ item, props }" >
              {{ item.props.title.firstname }} {{ item.props.title.lastname }}
            </template>
          </v-select>
        </div>
        <div class="default-actions px-8 items-center">
          <div>
            <v-btn
                class="white--text mr-6"
                :loading="loading"
                @click="submitResetPassword"
                color="validation-success"
            >
            Réinitialiser le mot de passe
            </v-btn>
            <v-btn
                class="white--text mr-6"
                :loading="loading"
                @click="navigateTo('/user')"
                color="validation-error"
            >
              Annuler
            </v-btn>
            <v-btn
                class="primary white--text"
                :loading="props.loading"
                color="primary-0"
                @click="submit"
            >
              Valider
            </v-btn>
          </div>
        </div>
      </v-form>
    </div>
  </v-container>
</template>
<script setup>
import {onMounted, ref, toRaw} from "vue";
import {isGranted} from "~/composables/utils.js";

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
  companies: {
    type: Object,
    default: null,
  },
  roles: {
    type: Object,
    default: null,
  },
  managers: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const form = ref(null);
const emit = defineEmits(["submit", "reset"]);
const loaded = ref(false);
const roles = ref([]);

onMounted(async () => {

  if (props.user) {
    if (props.user.roles.includes("ROLE_USER") && props.user.roles.length > 1) {
      props.user.roles.splice(props.user.roles.indexOf("ROLE_USER"), 1);
    }
    props.user.roles = props.user.roles.length  === 1 ? props.user.roles[0] : props.user.roles[props.user.roles.length - 1];

    props.user.companies = props.user.companies.map((company) => {
      return company['@id']
    })
  }
  await nextTick(() => {
    loaded.value = true;
  })
})

function submit() {
  const validation = form.value.validate();
  validation.then(async (success) => {
    if (success.valid) {
      props.user.roles = [props.user.roles]
      emit("submit", props.user);
    }
  });
}

function submitResetPassword() {
  emit("reset", props.user);
}
</script>
