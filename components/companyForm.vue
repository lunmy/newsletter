<!-- modify brand image or name -->
<template>
  <v-container class="fluid">
    <div class="w-2/5 p-10 mx-auto mt-10 border-sm rounded-lg">
      <v-text-field
        label="name"
        variant="solo-filled"
        rounded="lg"
        v-model="name"
      ></v-text-field>
      <v-text-field
        class="h-min"
        v-model="image"
        label="image path"
        variant="solo-filled"
        rounded="lg"
      ></v-text-field>
      <img class="w-60 mx-auto" :src="image" alt="" />
      <v-btn
        class="mt-2 bg-secondary"
        width="90%"
        type="button"
        block
        @click="updateCompany()"
        rounded="lg"
        :loading="isloading"
        ><span class="text-0 font-semibold text-base"> update </span></v-btn
      >
    </div>
  </v-container>
</template>
<script setup>
const { $apiSamarkand } = useNuxtApp();
const route = useRoute();

const company = ref();
// ref data
const idComp = ref("");
const name = ref("");
const image = ref("");
// new data
const newName = ref("");
const newImage = ref("");
const newImagePath = ref("");

const isloading = ref(false);
async function getCompanyInfo() {
  try {
    const id = route.params.id;
    company.value = await $apiSamarkand.getOneCompany(id);
    name.value = company.value.name || "";
    image.value = company.value.images[0] || "";
    idComp.value = id || "";
    return;
  } catch (error) {
    console.log(error);
  }
}

function reset() {
  isloading.value = false;
  newName.value = "";
  newImage.value = "";
  newImagePath.value = "";
  getCompanyInfo();
}
async function updateCompany() {
  try {
    isloading.value = true;
    const data = JSON.stringify({
      name: newName.value,
      //   todo see how handle adding picture
      //   images: [newImage.value],
    });

    await $apiSamarkand.updateCompany(idComp.value, data);
    reset();
  } catch (error) {
    console.log(error);
  }
}
getCompanyInfo();
</script>
