<template>

      <v-form ref="loginForm" @submit.prevent="submit" class="bg-white w-3/4">
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
            type="submit"
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

          navigateTo(`/campaign`);
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
