<!-- modify brand image or name -->
<template>
  <v-container class="fluid">
    <div class="w-2/5 p-10 mx-auto mt-10 border-sm rounded-lg">
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

        <img class="w-60 mx-auto" :src="company.images" alt="" />

        <v-btn
          class="mt-2 bg-secondary"
          width="90%"
          type="button"
          block
          @click="submit"
          rounded="lg"
          :loading="isloading"
          ><span class="text-0 font-semibold text-base"> update </span></v-btn
        >
      </v-form>
    </div>
  </v-container>
</template>

<script setup>
import { textRule } from "@/composables/rules";
const isloading = ref(false);
const newImg = ref([]);

const emit = defineEmits(["submit"]);
const form = ref(null);
const props = defineProps({
  company: {
    type: Object,
  },
});

/**
 * Function that emits a 'submit' event with the new name and image path values.
 */
function submit() {
  const validation = form.value.validate();
  validation.then(async (success) => {
    if (success.valid) {
      emit("submit", { company: props.company, newImg });
    }
  });
}
</script>
