<template>
  <div>
    <h1 class="text-3xl text-primary-0">Bienvenue {{ logintxt }}</h1>
  </div>
</template>

<script setup>
import { getStorage } from "@/composables/storage";

const router = useRouter();

const logintxt = ref("");
logintxt.value = getStorage("login");
</script>
