<template>
    <!-- todo REMOVE: just for testing -->
    <div>
        <NuxtLink class="mr-5" to="/home">Dashboard</NuxtLink>
        <NuxtLink class="mr-5" to="/">login</NuxtLink>
        <button v-if="isAuthenticated" @click="logout">log-out</button>
    </div>
    <NuxtPage />

</template>
<script lang="ts" setup>
import { getStorage } from '@/composables/storage';
import { logOut } from "@/composables/logOut";
let isAuthenticated = ref(getStorage('token') !== null);
function logout() {
    isAuthenticated.value = getStorage('token') !== null;
    logOut();

}
</script>
