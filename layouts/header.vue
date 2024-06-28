<template>
  <div class="bg-slate-700 d-flex">
    <img src="@/public/img/logo.svg" alt="" />

    <span class="d-flex align-center ml-auto mr-6">
      <!-- <NuxtLink class="mr-5" to="/home">Dashboard</NuxtLink>
      <NuxtLink class="mr-5" to="/">login</NuxtLink>
      <button v-if="display" @click="logout">logout</button> -->
      <div class="text-center">
        <!-- 
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark v-bind="props"> menu </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="select(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> menu </v-btn>
          </template>

          <v-list class="p-2">
            <v-list-item link to="/">
              <v-list-item-title>login</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/home">
              <v-list-item-title>Accueil</v-list-item-title>
            </v-list-item>
            <!-- todo setup properly or remove -->
            <v-divider
              height="2"
              minHeight="2"
              color="red-lighten-2"
            ></v-divider>
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
