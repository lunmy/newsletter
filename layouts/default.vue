<template>
  <v-layout>
    <!-- F5F5DC E0F7FA FFFDD0 B0C4DE-->
    <v-navigation-drawer style="background-color: #F5F5F5">
        <div class="flex justify-center m-6">
          <img src="/img/logo.png" alt="logo">
        </div>
          <nuxt-link to="/campaigns" class="w-full py-3 px-9 hover:bg-gray-200 flex">
            <span class="text-lg font-bold">
              Campagnes
            </span>
          </nuxt-link>
          <nuxt-link to="/newsletters" class="w-full py-3 px-9 hover:bg-gray-200 flex">
             <span class="text-lg font-bold">
              Newsletters
            </span>
          </nuxt-link>

    </v-navigation-drawer>
    <v-main bg-color="grey lighten-3">
      <div class="p-6">
      <NuxtPage />
      </div>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
</script>
