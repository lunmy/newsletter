<template>
  <div>
    <h1 class="text-3xl text-primary-0">Bienvenue {{ logintxt }}</h1>
  </div>
  <NuxtLink to="/login">login</NuxtLink>
</template>

<script setup>
import { getStorage } from "@/composables/storage";

const router = useRouter();
definePageMeta({
  middleware: ["auth"],
});
const logintxt = ref("");
logintxt.value = getStorage("login");
</script>
