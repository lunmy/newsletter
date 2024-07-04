<template>
  <div class="bg-slate-700 d-flex">
    <nuxtLink to="/home">
      <img src="@/public/img/logo.svg" alt="logo Samarkand" />
    </nuxtLink>

    <span class="d-flex align-center ml-auto mr-6">
      <div class="text-center">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> menu </v-btn>
          </template>

          <v-list>
            <v-list-item link to="/home">
              <v-list-item-title>Accueil</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title>login</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="display" @click="logout">
              <v-list-item-title>logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </span>
  </div>
</template>
<script setup>
import { useAuthStore } from "~/store/auth";
const { user } = storeToRefs(useAuthStore());
const { logUserOut } = useAuthStore();

let display = ref(false);
function updateDisplay() {
  display.value = user.value !== null && user.value !== undefined;
}
onMounted(async () => {
  updateDisplay();
});
watch(user, () => {
  updateDisplay();
});
function logout() {
  logUserOut();
  navigateTo("/");
}
</script>
