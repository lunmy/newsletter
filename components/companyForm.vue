<!-- modify brand image or name -->
<template>
  <v-container class="fluid">
    <div class="w-2/5 p-10 mx-auto mt-10 border-sm rounded-lg">
      <v-text-field
        label="name"
        variant="solo-filled"
        rounded="lg"
        v-model="_name"
      ></v-text-field>
      <v-text-field
        class="h-min"
        v-model="_imgPath"
        label="image path"
        variant="solo-filled"
        rounded="lg"
      ></v-text-field>
      <img class="w-60 mx-auto" :src="_imgPath" alt="" />
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
    </div>
  </v-container>
</template>

<script setup>
const isloading = ref(false);
const _name = ref("");
const _imgPath = ref("");

const emit = defineEmits(["submit"]);

const props = defineProps({
  company: {
    type: Object,
  },
});

onMounted(() => {
  _name.value = props.company["name"] || "";
  _imgPath.value = props.company["images"][0] || "";
});

function submit() {
  emit("submit", { newName: _name.value, imgPath: _imgPath.value });
}
</script>
