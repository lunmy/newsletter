<template>
  <v-container class="fluid">
    <!-- <v-skeleton-loader v-if="loaded" type="button"> </v-skeleton-loader> -->
    <div v-if="!loaded" class="w-2/5 p-10 mx-auto border-sm rounded-lg">
      <v-form ref="form">
        <v-text-field
          label="name"
          variant="solo-filled"
          rounded="lg"
          v-model="company.name"
          :rules="[textRule]"
        ></v-text-field>
        <v-file-input
          prepend-inner-icon="mdi-paperclip"
          :prepend-icon="null"
          accept="image/jpeg, image/png, image/webp, video/mp4, video/webm"
          v-model="newImg"
          label="image"
          variant="solo-filled"
          rounded="lg"
        ></v-file-input>

        <img class="w-60 mx-auto" :src="image" alt="" />

        <v-btn
          class="mt-2 bg-secondary"
          width="90%"
          type="button"
          block
          @click="submit"
          rounded="lg"
          :loading="isloading"
        >
          <span class="text-0 font-semibold text-base"> update </span>
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script setup>
import { textRule } from "@/composables/rules";

const props = defineProps({
  company: {
    type: Object,
  },
});
const loaded = ref(true);
const isloading = ref(false);
const newImg = ref([]);

const image = ref(props.company.images);

const emit = defineEmits(["submit"]);
const form = ref(null);

watch(
  () => props.company,
  async (data) => {
    if (data && data.images) {
      image.value = await data.images;
      loaded.value = false;
    }
  },
  { immediate: true }
);

watch(newImg, (data) => {
  if (data && data.length > 0) {
    const file = data[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function submit() {
  const validation = form.value.validate();
  validation.then(async (success) => {
    if (success.valid) {
      isloading.value = true;
      emit("submit", { company: props.company, newImg });
      isloading.value = false;
      loaded.value = true;
    }
  });
}
</script>
