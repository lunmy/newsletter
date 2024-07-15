<template>
  <div v-if="loading" class="text-center pt-3">
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg m-2"></div>
    <div class="flex h-160 py-3">
      <div class="w-96 h-full overflow-hidden">
        <div class="animate-pulse bg-gray-300 w-full h-full rounded-lg m-2"></div>
      </div>
      <div class="flex-1 h-full overflow-hidden">
        <div class="animate-pulse bg-gray-300 w-full h-full rounded-lg m-2"></div>
      </div>
      <div class="w-160 h-full overflow-hidden">
        <div class="animate-pulse bg-gray-300 w-full h-full rounded-lg m-2"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2 class="text-2xl font-bold mb-4">Modification de {{ newsletter.name }}</h2>
    <tiptap-editor v-model="newsletter.content"/>
    <v-form ref="form">
      <v-expansion-panels>
        <v-expansion-panel title="Modifier les informations">
          <v-expansion-panel-text>
            <div class="grid grid-cols-2 gap-4 w-full">
              <v-text-field
                  label="Nom de la newsletter"
                  variant="solo-filled"
                  rounded="lg"
                  v-model="newsletter.name"
                  :rules="[textRule]">
              </v-text-field>
              <v-text-field
                  label="Sujet"
                  variant="solo-filled"
                  rounded="lg"
                  v-model="newsletter.subject"
                  :rules="[textRule]">
              </v-text-field>
              <v-text-field
                  label="Code de tracking"
                  variant="solo-filled"
                  rounded="lg"
                  v-model="newsletter.trackingCode">
              </v-text-field>
              <v-text-field
                  label="Chemin des images"
                  variant="solo-filled"
                  rounded="lg"
                  v-model="newsletter.imagePath">
              </v-text-field>
              <v-select
                  v-model="newsletter.status"
                  :items="newsletterStatus()"
                  item-title="label"
                  item-value="key"
                  label="Type"
                  single-line
                  rounded="lg"
                  required
                  variant="solo-filled"
              ></v-select>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="flex my-3" ref="newsletterContent">
        <PerfectScrollbar class="w-52 h-full px-3">
          <VueDraggable
              v-model="blocks"
              animation="300"
              ghostClass="ghost"
              :group="{ name: 'people', pull: 'clone', put: false }"
              :clone="cloneBlock"
              :sort="false"
          >
            <div v-for="block in blocks" :key="block['@id']">
              <div class="flex flex-col justify-center items-center my-6">
                <nuxt-img :src='block.images[0]' class="w-auto h-32"/>
                {{ block.name }}
              </div>
              <hr v-if="block !== blocks[blocks.length - 1]"/>
            </div>
          </VueDraggable>
        </PerfectScrollbar>
        <PerfectScrollbar class="flex-1 px-3">
          <v-expansion-panels class="mb-3">
            <v-expansion-panel title="Variables de newsletter">
              <v-expansion-panel-text>
                <v-expansion-panels>
                  <v-expansion-panel v-for="item in newsletter.variables" :key="item" :title="item.identifier">
                    <v-expansion-panel-text>
                      <div>{{ item.name }}</div>
                      <v-text-field
                          v-if="item.type === 'STRING'"
                          label="Valeur"
                          class="my-3"
                          variant="solo-filled"
                          rounded="lg"
                          v-model="item.value">
                      </v-text-field>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <hr class="border-1"/>
          <v-expansion-panels class="min-h-12">
            <VueDraggable
                v-model="newsletter.blocks"
                animation="150"
                group="people"
                ghostClass="ghost"
                class="mt-3 w-full"
                @update="onUpdate"
            >
              <v-expansion-panel v-for="block in newsletter.blocks" :key="block['@id']" class="mt-3">
                <v-expansion-panel-title>
                  <div class="w-full flex justify-between items-center">
                    <nuxt-img v-if="typeof block.images[0] === 'object'" :src="block.images[0]['@id']"
                              class="w-auto h-16"/>
                    <nuxt-img v-else :src="block.images[0]" class="w-auto h-16"/>
                    <div class="flex-1 px-3">
                      {{ block.title }}
                    </div>
                    <div class="w-6">
                      <v-icon color="validation-error" @click.prevent="deleteBlock(block)">mdi-delete</v-icon>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-text-field
                      label="Titre"
                      class="my-3"
                      variant="solo-filled"
                      rounded="lg"
                      v-model="block.title"
                      :rules="[textRule]"></v-text-field>
                  <v-expansion-panels>
                    <v-expansion-panel v-for="item in block.variables" :key="item" :title="item.identifier">
                      <v-expansion-panel-text>
                        <div>
                          {{ item.name }}
                          <p v-if="item.description" class="text-sm">{{ item.description }}</p>
                        </div>
                        <v-text-field
                            v-if="item.type === 'STRING'"
                            label="Valeur"
                            class="my-3"
                            variant="solo-filled"
                            rounded="lg"
                            v-model="item.value">
                        </v-text-field>
                        <v-textarea
                            v-if="item.type === 'TEXT'"
                            label="Valeur"
                            class="my-3"
                            variant="solo-filled"
                            rounded="lg"
                            v-model="item.value">
                        </v-textarea>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <div class="mt-3 flex items-center justify-center w-full">
                <div
                    class="flex flex-col items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
                  Ajouter un bloc ici
                </div>
              </div>
            </VueDraggable>
          </v-expansion-panels>
        </PerfectScrollbar>
        <PerfectScrollbar class="w-160">
          <div v-html="content"></div>
        </PerfectScrollbar>
      </div>
      <div class="default-actions px-8 items-center">
        <div/>
        <div>
          <v-btn
              class="white--text mr-6"
              :loading="loading"
              @click="navigateTo('/campaign')"
              color="validation-error"
          >
            Annuler
          </v-btn>

          <v-btn
              class="primary white--text"
              :loading="loading"
              @click="save"
              color="primary-0"
          >
            Valider
          </v-btn>

        </div>
      </div>
    </v-form>
  </div>
</template>
<script setup>
import {textRule} from "~/composables/rules.js";
import {newsletterStatus, variablesTypes} from "~/composables/referenceValues.js";
import {getIdFromIri} from "~/composables/utils.js";
import {PerfectScrollbar} from 'vue3-perfect-scrollbar'
import {VueDraggable} from 'vue-draggable-plus'
import TiptapEditor from "~/components/TiptapEditor.vue";

const {$apinewsletter} = useNuxtApp();
const route = useRoute();
const loading = ref(true);
const newsletter = ref(null);
const blocks = ref([]);
const blocks2 = ref([]);
const content = ref(null);
const newsletterContent = ref(null);
const activePanel = ref(0);

watch(newsletter, (data) => {
  if (data) {
    formatContent(data)
  }
}, {deep: true});


onMounted(async () => {
  try {
    window.addEventListener("resize", setContentHeight, true)
    newsletter.value = await $apinewsletter.getOneNewsletter(route.params.id);
    blocks.value = await $apinewsletter.getAllBlocks({all: true});
    content.value = newsletter.value.content
    formatContent(newsletter.value)
  } catch (e) {
    errorToast(e.message);
  }
  loading.value = false;
  setContentHeight()
})

function setContentHeight() {
  nextTick(() => {
    if (newsletterContent.value) {
      const rect = newsletterContent.value.getBoundingClientRect();
      const topLeftY = rect.top;
      // Get screen height
      const screenHeight = window.innerHeight - 70;
      // Calculate the bottom position
      const newsletterContentHeight = screenHeight - (topLeftY);
      newsletterContent.value.style.height = newsletterContentHeight + 'px';
    }
  })
}

function formatContent(data) {
  content.value = data.content
  data.variables.forEach(variable => {
    content.value = content.value.replace('%' + variable.identifier + '%', variable.value ?? '')
  })
  let blocksContent = '';
  data.blocks.forEach(block => {
    let blockContent = block.content;
    block.variables.forEach(variable => {
      blockContent = blockContent.replace('%' + variable.identifier + '%', variable.value ?? '')
    })
    blocksContent = blocksContent + blockContent
  })
  content.value = content.value.replace('%assets%', blocksContent)
}

function cloneBlock(element) {
  const newsletterBlock = {
    title: element.name,
    name: element.name,
    content: element.content,
    baseBlock: getIdFromIri(element['@id']),
    position: newsletter.value.blocks.length + 1
  }
  if (element.images) {
    newsletterBlock.images = element.images
  }
  if (element.variables) {
    newsletterBlock.variables = element.variables
    newsletterBlock.variables.forEach(variable => {
      delete variable.block
    })
  }
  newsletterBlock.value = '';
  return newsletterBlock;
}

function onUpdate() {
  // Set new blocks position after update
  newsletter.value.blocks.forEach((block, index) => {
    block.position = index + 1
  })
}

function deleteBlock(item) {
  const index = newsletter.value.blocks.indexOf(item);
  if (index > -1) {
    newsletter.value.blocks.splice(index, 1);
  }
}

async function save() {
  try {
    loading.value = true;
   newsletter.value = await $apinewsletter
        .updateNewsletter(newsletter.value)
    successToast("Newsletter mise à jour");
    // navigateTo('/campaign')
  } catch (e) {
    errorToast(e.message);
    console.log(e)
  }
  loading.value = false;

}


</script>
