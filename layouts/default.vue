<template>
  <v-layout>
    <!-- F5F5DC E0F7FA FFFDD0 B0C4DE-->
    <v-navigation-drawer
        style="background-color: #F5F5F5"
        rail
        expand-on-hover
    >
      <div class="m-4 h-36 flex items-end justify-center">
      <img src="/img/logo.png" alt="logo" class="min-w-8 h-auto mr-2 inline-block"/>
      </div>
      <v-list>
        <v-list-item
            v-for="item in menu" :key="item.name"
            class="!pl-3 !pr-0 !py-0"
            :prepend-icon="item.icon"
            base-color="primary-0"
            :active="containsPath(item.link)"
            :variant="containsPath(item.link) ? 'elevated' : 'plain'"
        >
          <nuxt-link v-if="isGranted(item.isGranted)" :to="item.link">
            {{ item.name }}
          </nuxt-link>
        </v-list-item>

      </v-list>
      <template v-slot:append>
        <v-list>
        <v-list-item
            class="!pl-3 !pr-0 !py-0"
            prepend-icon="mdi-logout"
          @click="logout()">
          <v-btn block
          variant="text">
            Déconnexion
          </v-btn>
        </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main bg-color="grey lighten-3">
      <div class="p-6">
        <NuxtPage/>
      </div>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import {isGranted} from "@/composables/utils";
import {useAuthStore} from "~/store/auth";
definePageMeta({
  middleware: 'auth'
})

const { logUserOut } = useAuthStore();
const route  = useRoute();

const menu = ref(
    [
      {
        name: "Campagnes",
        link: "/campaign",
        isGranted: "IS_AUTHENTICATED_FULLY",
        icon: 'mdi-bullhorn-outline',
      },
      {
        name: "Newsletters",
        link: "/newsletter",
        isGranted: "IS_AUTHENTICATED_FULLY",
        icon: 'mdi-email-outline',
      },
      {
        name: "Templates",
        link: "/template",
        isGranted: "ROLE_SUPER_ADMIN",
        icon: 'mdi-square-rounded-outline',
      },
      {
        name: "Blocs",
        link: "/block",
        isGranted: "ROLE_SUPER_ADMIN",
        icon: 'mdi-apps',
      },
      {
        name: "Utilisateurs",
        link: "/user",
        isGranted: "ROLE_ADMIN",
        icon: 'mdi-account-group-outline',
      },
      {
        name: "Mon compte",
        link: "/me",
        isGranted: "IS_AUTHENTICATED_FULLY",
        icon: 'mdi-account-box-outline',
      },
    ]
);
function containsPath(path: string) {
  // Check if the current route contains the given path
  return route.path.includes(path);
}

function logout()
{
  logUserOut();
  navigateTo("/");
}

</script>
