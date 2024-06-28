<!-- modify brand image or name -->
<template>
  <h1 class="text-xl font-bold text-center">Update</h1>

  <span class="w-2/3 mx-auto mt-10 d-flex flex-row">
    <div class="w-2/5">
      <v-text-field
        label="name"
        variant="solo-filled"
        rounded="lg"
        v-model="name"
        readonly
      ></v-text-field>
      <v-text-field
        class="h-min"
        v-model="image"
        readonly
        label="image"
        variant="solo-filled"
        rounded="lg"
      ></v-text-field>
      <img class="w-60" :src="image" alt="" />
    </div>

    <div class="w-1/5 d-flex justify-center pt-14">
      <svg
        width="53"
        height="16"
        viewBox="0 0 53 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52.7071 8.70711C53.0976 8.31658 53.0976 7.68342 52.7071 7.29289L46.3431 0.928932C45.9526 0.538408 45.3195 0.538408 44.9289 0.928932C44.5384 1.31946 44.5384 1.95262 44.9289 2.34315L50.5858 8L44.9289 13.6569C44.5384 14.0474 44.5384 14.6805 44.9289 15.0711C45.3195 15.4616 45.9526 15.4616 46.3431 15.0711L52.7071 8.70711ZM0 9H52V7H0V9Z"
          fill="black"
        />
      </svg>
    </div>

    <div class="w-2/5">
      <v-text-field
        label="name"
        variant="solo-filled"
        rounded="lg"
        v-model="name"
      ></v-text-field>
      <v-text-field
        class="h-min"
        v-model="image"
        label="image"
        variant="solo-filled"
        rounded="lg"
      ></v-text-field>
      <img class="w-60" :src="image" alt="" />
      <v-btn
        class="mt-2 bg-secondary"
        width="90%"
        type="button"
        @click="updateCompany()"
        rounded="lg"
        :loading="isloading"
        ><span class="text-0 font-semibold text-base"> update </span></v-btn
      >
    </div>
  </span>
</template>
<script setup>
const { $apiSamarkand } = useNuxtApp();
const route = useRoute();
const company = ref();
const isloading = ref(false);
const name = ref("");
const image = ref("");
const idComp = ref("");

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

async function updateCompany() {
  console.log("update");
}

getCompanyInfo();
</script>
