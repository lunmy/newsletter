<template>
  <v-container class="fluid">
    <div v-if="!loaded && props.block === null" class="space-y-4">
      <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse my-6 bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse bg-gray-300 h-10 w-full rounded-lg"></div>
    </div>
    <div v-else class="space-y-4">
      <v-form ref="form">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-8">
            <v-text-field
                label="Nom du bloc"
                variant="solo-filled"
                rounded="lg"
                v-model="props.block.name"
                :rules="[textRule]"></v-text-field>
            <v-textarea
                label="Contenu du template"
                variant="solo-filled"
                rounded="lg"
                v-model="props.block.content"
                rows="20"
                :rules="[textRule]"></v-textarea>
          </div>
          <div class="col-span-4">
            <v-file-input
                prepend-inner-icon="mdi-paperclip"
                :prepend-icon="null"
                accept="image/jpeg, image/png, image/webp, image/gif"
                v-model="newImg"
                label="image"
                variant="solo-filled"
                rounded="lg"></v-file-input>

            <div v-if="image !== null">
              <NuxtImg class="w-60 mx-auto" :src="image" alt=""/>
            </div>
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
            class="mt-2 bg-primary-0"
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
import { variablesTypes} from "@/composables/referenceValues";
import {onMounted, ref, watch, toRaw} from "vue";
import {extractTextBetweenPercents} from "@/composables/utils";

const props = defineProps({
  block: {
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
const newImg = ref(null);
const image = ref(null);
const variables = ref([]);
const itemsReferences = ref({});

watch(newImg, (data) => {
  if (data !== null) {
    const file = data;
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

watch(props.block, (data) => {
  if (data !== null && data.content !== null) {
    loadVariables()
  }
}, {deep: true});


onMounted(async () => {
  loaded.value = true;

  if (props.block && props.block.images && props.block.images.length > 0) {
    image.value = props.block.images[0];
  }
  itemsReferences.value.variableTypes = variablesTypes()
  loadVariables()
})

function loadVariables() {
  const blockVariables = extractTextBetweenPercents(props.block.content);
  variables.value = structuredClone(toRaw(props.block.variables))
  blockVariables.forEach((variable) => {
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
  props.block.variables.forEach((variable) => {
    if (!blockVariables.includes(variable.identifier)) {
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
      if (newImg.value !== null) {
        const oldImages = structuredClone(toRaw(props.block.images))
        props.block.images = {
          newImages: [newImg.value],
          oldImages
        }
      }
      props.block.variables = variables.value
      emit("submit", props.block);
    }
  });
}
</script>
