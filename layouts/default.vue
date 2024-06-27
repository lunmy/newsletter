<template>
    <!-- todo REMOVE: just for testing -->
    <div>
        <NuxtLink class="mr-5" to="/home">Dashboard</NuxtLink>
        <NuxtLink class="mr-5" to="/">login</NuxtLink>
        <button v-if="auth" @click="logout">logout</button>

    </div>
    <NuxtPage />

</template>
<script lang="ts" setup>
import { isAuth } from '@/composables/storage';
import { setStorage } from "@/composables/storage";
const auth = ref(isAuth())

function logout() {
    auth.value = false
    setStorage('token', '')
    navigateTo('/')
}
</script>
