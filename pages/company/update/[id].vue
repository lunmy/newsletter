<!-- modify brand image or name -->
<template>
    <h1 class="text-xl font-bold text-center">Update</h1>

    <span class="w-1/2 mx-auto mt-10 block">
        <div class="d-flex">
            <v-btn class="mt-2 bg-secondary" type="button" position="relative" @click="updateCompany()" rounded="lg"
                :loading="isloading"><span class="text-0 font-semibold text-base">
                    update </span></v-btn>
            <v-text-field v-model="name" variant="solo" rounded="lg"></v-text-field>
        </div>
        <div class="d-flex">
            <v-btn class="mt-2 bg-secondary" type="button" @click="updateCompany()" rounded="lg"
                :loading="isloading"><span class="text-0 font-semibold text-base"> update </span></v-btn>
            <v-text-field class="h-min" v-model="image" label="image" variant="solo" rounded="lg"></v-text-field>
            <img class="w-60" :src=image alt="">
        </div>
    </span>

</template>
<script setup>
const { $apiSamarkand } = useNuxtApp()
const route = useRoute()
const company = ref()
const companyForm = ref(null)
const isloading = ref(false);
const name = ref("")
const image = ref("")
const idComp = ref("")

async function getCompanyInfo() {
    try {
        const id = route.params.id
        company.value = await $apiSamarkand.getOneCompany(id)
        name.value = company.value.name || "";
        image.value = company.value.images[0] || "";
        idComp.value = id || "";
        return
    } catch (error) {
        console.log(error)

    }
}

async function updateCompany() {
    console.log("update");
}

getCompanyInfo()


</script>
