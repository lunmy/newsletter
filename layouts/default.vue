<template>
    <div>
        <NuxtLink class="mr-5" to="/home">Dashboard</NuxtLink>
        <NuxtLink class="mr-5" to="/">login</NuxtLink>
        <button v-if="display" @click="logout">logout</button>
    </div>
    <NuxtPage />

</template>
<script setup>
import { useAuthStore } from "~/store/auth";
const { user } = storeToRefs(useAuthStore());
const { logUserOut } = useAuthStore()

let display = ref(false)
function updateDisplay() {
    display.value = user.value !== null && user.value !== undefined
}
onMounted(async () => {
    updateDisplay()
})
watch(user, () => {
    updateDisplay()
})
function logout() {
    logUserOut()
    navigateTo('/');
}
</script>
