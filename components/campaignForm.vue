<template>
  <v-container class="fluid">
    <!-- todo change loader with skeleton loader for uniform code -->
    <!-- loader -->
    <div v-if="!loaded && props.campaign === null" class="w-2/5 mx-auto space-y-4">
      <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse my-6 bg-gray-300 h-14 w-full rounded-lg"></div>
      <div class="animate-pulse bg-gray-300 h-10 w-full rounded-lg"></div>
    </div>

    <div v-else class="space-y-4">
      <v-form ref="form">
        <div class="grid grid-cols-2 gap-4">
        <!-- name -->
        <v-text-field
          label="nom de la campagne"
          variant="solo-filled"
          rounded="lg"
          v-model="props.campaign.name"
          :rules="[textRule]">

        </v-text-field>
        <v-text-field
          label="description"
          variant="solo-filled"
          rounded="lg"
          v-model="props.campaign.description">
        </v-text-field>

        <v-file-input
            prepend-inner-icon="mdi-paperclip"
            :prepend-icon="null"
            accept="image/jpeg, image/png, image/webp, video/mp4, video/webm"
            v-model="newImg"
            label="image"
            variant="solo-filled"
            rounded="lg"></v-file-input>
        <div v-if="image !== null">
          <NuxtImg class="w-60 mx-auto" :src="image" alt="" />
        </div>
        </div>
        <div class="default-actions px-8 items-center">
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
import { textRule } from "@/composables/rules";

const props = defineProps({
  campaign: {
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

onMounted(async () => {
  loaded.value = true;
  if (props.campaign && props.campaign.images && props.campaign.images.length > 0) {
    image.value = props.campaign.images[0]['@id'];
  }
})
function submit() {
  const validation = form.value.validate();
  validation.then(async (success) => {
    if (success.valid) {
      if(newImg.value !== null)
      {
        const oldImages= structuredClone(toRaw(props.campaign.images))
        props.campaign.images = {
          newImages :  [newImg.value],
          oldImages
        }
      }
      emit("submit", props.campaign);
    }
  });
}
</script>
