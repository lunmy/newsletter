<template>
  <v-container class="fluid">
    <div v-if="!loaded && props.template === null" class="w-2/5 mx-auto space-y-4">
      <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse my-6 bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse bg-gray-300 h-10 w-full rounded-lg"></div>
    </div>

    <div v-else class="space-y-4">
      <v-form ref="form">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-8">
            <v-text-field
                label="Nom du template"
                variant="solo-filled"
                rounded="lg"
                v-model="props.template.name"
                :rules="[textRule]"></v-text-field>
            <v-textarea
                label="Contenu du template"
                variant="solo-filled"
                rounded="lg"
                v-model="props.template.content"
                rows="20"
                :rules="[textRule]"></v-textarea>
          </div>
          <div class="col-span-4">
            <h3 class="text-2xl py-3">Variables</h3>
            <v-expansion-panels>
              <v-expansion-panel v-for="item in variables" :key="item" :title="item.identifier">
                <v-expansion-panel-text>
                  <v-text-field
                      label="Nom de la variable"
                      class="my-3"
                      variant="solo-filled"
                      rounded="lg"
                      v-model="item.name"
                      required
                      :rules="[textRule]">
                  </v-text-field>
                  <v-select
                      v-model="item.type"
                      :items="variablesTypes()"
                      item-title="label"
                      item-value="key"
                      label="Type"
                      single-line
                      rounded="lg"
                      required
                      variant="solo-filled"
                  ></v-select>
                  <v-text-field
                      label="Description"
                      class="my-3"
                      variant="solo-filled"
                      rounded="lg"
                      v-model="item.description">
                  </v-text-field>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
        <v-btn
            class="mt-2 bg-primary-0 inline"
            type="button"
            block
            @click="submit"
            rounded="lg"
            :loading="props.loading">
          <span class="text-0 font-semibold text-base"> Valider </span>
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script setup>
import {textRule} from "@/composables/rules";
import {onMounted, ref, toRaw, watch} from "vue";
import {variablesTypes} from "~/composables/referenceValues.js";
import {extractTextBetweenPercents} from "~/composables/utils.js";

const props = defineProps({
  template: {
    type: Object,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const form = ref(null);
const emit = defineEmits(["submit"]);
const loaded = ref(false);
const variables = ref([]);
const itemsReferences = ref({});

watch(props.template, (data) => {
  if (data !== null && data.content !== null) {
    loadVariables()
  }
}, {deep: true});


onMounted(async () => {
  loaded.value = true;
  itemsReferences.value.variableTypes = variablesTypes()
  loadVariables()
})

function loadVariables() {
  const templateVariables = extractTextBetweenPercents(props.template.content);
  variables.value = structuredClone(toRaw(props.template.variables))
  templateVariables.forEach((variable) => {
    const existingVariable = variables.value.find(
        (v) => v.identifier === variable
    );
    if (!existingVariable) {
      const v = {
        name: variable,
        identifier: variable,
        description: '',
        type: 'STRING',
        value: '',
      }
      variables.value.push(structuredClone(v));
    }
  });
  // remove variables that are not in blockVariables but in props.block.variables
  props.template.variables.forEach((variable) => {
    if (!templateVariables.includes(variable.identifier)) {
      variables.value = variables.value.filter(
          (v) => v.identifier !== variable.identifier
      );
    }
  });


}

function submit() {
  const validation = form.value.validate();
  validation.then(async (success) => {
    if (success.valid) {
      props.template.variables = variables.value
      emit("submit", props.template);
    }
  });
}
</script>
