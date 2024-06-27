<template>
    <!-- todo REMOVE: just for testing -->
    <div>
        <NuxtLink class="mr-5" to="/home">Dashboard</NuxtLink>
        <NuxtLink class="mr-5" to="/">login</NuxtLink>
        <button v-if="user" @click="logout">logout</button>

    </div>
    <NuxtPage />

</template>
<script lang="ts" setup>
import { setStorage, getStorage } from "@/composables/storage";
const user = ref(false)
user.value = getStorage("login") != null

function logout() {
    setStorage("login", '');
    setStorage("token", '');
    user.value = getStorage("login") != null
    navigateTo('/');
}
</script>
