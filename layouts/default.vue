<template>
  <v-layout>
    <!-- F5F5DC E0F7FA FFFDD0 B0C4DE-->
    <v-navigation-drawer style="background-color: #F5F5F5">
      <div class="flex justify-center m-6">
        <img src="/img/logo.png" alt="logo">
      </div>

      <template v-for="item in menu" :key="item.name">
        <nuxt-link v-if="isGranted(item.isGranted)" :to="item.link" class="w-full py-3 px-9 hover:bg-gray-200 flex"
        :class="{'bg-primary-0 text-white': containsPath(item.link)}">
        <span class="text-lg font-bold">
          <v-icon>{{ item.icon }}</v-icon> {{ item.name }}
        </span>
        </nuxt-link>
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
        isGranted: "ROLE_SUPER_ADMIN",
        icon: 'mdi-account-outline',
      },
    ]
);
function containsPath(path: string) {
  // Check if the current route contains the given path
  return route.path.includes(path);
}

</script>
