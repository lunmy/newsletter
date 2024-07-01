<template>
  <v-sheet
    class="mt-20 mx-auto p-10 border-primary-0 border-sm rounded-lg"
    elevation="2"
    width="600"
  >
    <span>
      <div class="d-flex justify-center">
        <svg
          width="110"
          height="114"
          viewBox="0 0 110 114"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.5 83.4L46.1667 72.4L55 112L63.8333 72.4L81.5 83.4L68.25 65.8L108 57L68.25 48.2L81.5 30.6L63.8333 41.6L55 2L46.1667 41.6L28.5 30.6L41.75 48.2L2 57L28.5 62.8667"
            stroke="#273B4B"
            stroke-width="3"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="d-flex justify-center mb-5">
        <p class="text-red">{{ errorMsg }}</p>
      </div>
      <v-form ref="loginForm">
        <v-text-field
          v-model="login"
          label="Login"
          :rules="[loginRule]"
          variant="solo"
          rounded="lg"
          required
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="password"
          label="Password"
          :rules="[passwordRule]"
          variant="solo"
          rounded="lg"
          required
        ></v-text-field>
        <v-btn
          class="mt-2 bg-secondary"
          type="button"
          block
          @click="checkInput()"
          rounded="lg"
          :loading="isloading"
          ><span class="text-0 font-semibold text-base"> Connect </span></v-btn
        >
      </v-form>
    </span>
  </v-sheet>
</template>
<script setup>
import { loginRule, passwordRule } from "@/composables/rules";
import { useAuthStore } from "~/store/auth";
const { setToken, setUser } = useAuthStore();

const { $authApi } = useNuxtApp();
const router = useRouter();
const loginForm = ref(null);
const isloading = ref(false);

const errorMsg = ref("");
const login = ref("superadmin@syneidolab.com");
const password = ref("super_admin");

async function checkInput() {
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

          navigateTo(`/home`);
        })
        .catch((error) => {
          const status = error.response.status;
          switch (status) {
            case 404:
              errorMsg.value = `Erreur lors de la connection, verifier vos information`;
              break;
            default:
              errorMsg.value = "Une erreur est survenue";
          }
        })
        .finally(() => {
          isloading.value = false;
        });
    }
  });
}
</script>
