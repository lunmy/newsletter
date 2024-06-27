<template>
    <!-- todo REMOVE: just for testing -->
    <div>
        <NuxtLink class="mr-5" to="/home">Dashboard</NuxtLink>
        <NuxtLink class="mr-5" to="/">login</NuxtLink>
        <!-- <button @click="logout">logout</button> -->
        <button v-if="user" @click="logout">logout</button>

    </div>
    <NuxtPage />

</template>
<script setup>
import { setStorage, getStorage } from "@/composables/storage";
const user = ref(false)



function logout() {
    user.value = getStorage("login") != null
    setStorage("login", '');
    setStorage("token", '');
    navigateTo('/');
}
onMounted(() => {
    user.value = getStorage("login")
})
</script>
