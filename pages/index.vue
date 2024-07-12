<template>
  <!-- component -->
  <div class="h-screen md:flex">
    <div
        class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr bg-primary-0 justify-around items-center hidden">
      <div>
        <h1 class="text-white font-bold text-4xl font-sans">Papillons Blancs de Dunkerque</h1>
        <p class="text-white mt-1">Création de newsletters</p>

      </div>
      <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    </div>
    <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
      <v-form ref="loginForm" class="bg-white w-1/2">
        <div class="flex justify-center mb-5">
          <img src="/img/logo.png" alt="logo" class="w-20 h-20 mr-2 inline-block"/>
        </div>
        <v-text-field
            v-model="login"
            label="Email"
            :rules="[textRule, emailRule]"
            rounded=50
            prepend-inner-icon="mdi-email"
            variant="outlined"
            class="w-full mt-5 rounded-2xl"
            required
        />
        <v-text-field
            v-model="password"
            label="Mot de passe"
            :rules="[textRule]"
            prepend-inner-icon="mdi-lock"
            rounded-full
            variant="outlined"
            class="w-full mt-5 rounded-2xl"
            type="password"
            required
        />
        <v-btn
            @click.prevent="submit()"
            class="block w-full font-semibold mb-2 rounded-2xl"
            color="primary-0"
            base-color="secondary-0"
            :loading="isloading"
        >
          Connexion
        </v-btn>
        <div v-if="errorMessage !== ''"
             class="text-center text-validation-error mx-4">
          <span class="text-lg">{{ errorMessage }}</span> <br/>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script setup>
import {passwordRule, emailRule } from "@/composables/rules";
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: 'login'
})

const { setToken, setUser } = useAuthStore();

const { $authApi } = useNuxtApp();
const router = useRouter();
const loginForm = ref(null);
const isloading = ref(false);

const errorMessage = ref("");
const login = ref("anthony@lunamy.com");
const password = ref("bT2gSUIr8ifyxo7QyYJZ");

async function submit() {
  // validate :rules
  const promise = loginForm.value.validate();
  promise.then((success) => {
    if (success.valid) {
      isloading.value = true;
      // check API for validation
      $authApi
        .checkAuth(login.value, password.value)
        .then((data) => {
          // set data in pinia storage
          setUser(login.value);
          setToken(data.token);

          navigateTo(`/campaigns`);
        })
        .catch((error) => {
          const status = error.response.status;
          switch (status) {
            case 404:
              errorMessage.value = `Erreur lors de la connection, verifier vos information`;
              break;
            default:
              errorMessage.value = "Une erreur est survenue";
          }
        })
        .finally(() => {
          isloading.value = false;
        });
    }
  });
}
</script>
