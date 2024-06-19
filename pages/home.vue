<template>
  <h1 class="text-3xl text-primary-0">Bienvenue {{ logintxt }}</h1>
  <v-btn class="mt-2" @click="router.back()">back</v-btn>
</template>

<script setup>
import { getStorage } from "@/composables/storage";

const router = useRouter();

const logintxt = ref("");

let login = getStorage("login");

logintxt.value = getStorage("login");
console.log(getStorage("token"));
</script>
