<template>
  <v-container class="fluid">
    <div class="w-2/5 p-10 mx-auto border-sm rounded-lg">
      <!-- loader -->
      <div v-if="company == []" class="w-full">
        <div class="animate-pulse bg-gray-300 h-14 w-full rounded-lg"></div>
        <div
          class="animate-pulse my-6 bg-gray-300 h-14 w-full rounded-lg"
        ></div>
        <div class="animate-pulse my-6 mx-auto bg-gray-300 h-60 w-60"></div>
        <div class="animate-pulse bg-gray-300 h-10 w-full rounded-lg"></div>
      </div>

      <!-- form -->
      <v-form v-else ref="form">
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
          :loading="props.loading"
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
  loading: {
    type: Boolean,
    default: false,
  },
});

const newImg = ref([]);
const image = ref(props.company.images);
const emit = defineEmits(["submit"]);
const form = ref(null);

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
      emit("submit", { company: props.company, newImg });
    }
  });
}
</script>
