<template>
  <v-sheet
    class="mt-52 mx-auto p-10 border-primary-0 border-sm rounded-lg"
    elevation="2"
    width="600"
  >
    <span>
      <div class="d-flex justify-center m-16">
        <svg class="h-11 w-56">
          <path
            d="M94.4536 32.7884V42.2693H54.0394V1.80615H66.2523V32.7884H94.4536Z"
            fill="var(--clr-body)"
            data-astro-cid-3ef6ksr2=""
          ></path>
          <path
            d="M215.862 31.1756C215.862 38.1704 209.336 42.2693 199.043 42.2693H166.651V1.80615H196.652C206.954 1.80615 213.471 5.79811 213.471 12.2672C213.471 16.8295 210.176 20.8214 203.889 21.1689C210.48 21.5699 215.871 24.9292 215.871 31.1667L215.862 31.1756ZM178.744 17.9433H194.612C198.683 17.9433 201.378 17.0701 201.378 13.9513C201.378 10.8326 198.683 10.0217 194.612 10.0217H178.744V17.9344V17.9433ZM203.354 29.7944C203.354 26.4975 200.778 25.5797 196.467 25.5797H178.744V34.0715H196.467C200.778 34.0715 203.354 33.0914 203.354 29.7944Z"
            fill="var(--clr-body)"
            data-astro-cid-3ef6ksr2=""
          ></path>
          <path
            d="M136.594 1.80615H123.246L101.562 42.2693H114.374L118.279 34.6151H126.726L122.47 26.2391L122.516 26.1411L129.827 11.8128L137.065 26.1411L141.32 34.526L145.271 42.2693H158.269L136.594 1.80615Z"
            fill="var(--clr-body)"
            data-astro-cid-3ef6ksr2=""
          ></path>
          <path
            d="M19.3486 42.9999C12.416 42.9999 5.60336 41.093 0.655438 37.7605C-0.0369012 37.2971 -0.212294 36.3704 0.267728 35.6932C0.74775 35.0249 1.70779 34.8556 2.40013 35.3279C6.84034 38.3129 13.016 40.0327 19.3394 40.0327C26.8536 40.0327 34.9401 36.8961 34.9401 29.9904C34.9401 24.35 29.0137 21.5075 20.1333 18.9769C13.7637 17.1858 6.54494 15.1453 6.54494 8.94352C6.54494 4.28326 11.6867 1.03979 19.044 1.03979C24.1396 1.03979 28.5706 2.20709 32.9923 4.70206C33.7216 5.11195 33.9708 6.02083 33.5462 6.72477C33.1215 7.42871 32.1707 7.66039 31.4507 7.25941C27.4628 5.00502 23.6411 4.00703 19.0532 4.00703C14.4653 4.00703 9.62816 5.70896 9.62816 8.95243C9.62816 12.6503 14.3453 14.2632 21.0102 16.1433C29.8537 18.6561 38.0233 22.0778 38.0233 29.9993C38.0233 37.9209 30.3522 42.9999 19.3578 42.9999H19.3486Z"
            fill="var(--clr-body)"
            data-astro-cid-3ef6ksr2=""
          ></path>
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
import { setStorage } from "@/composables/storage";
import { loginRule, passwordRule } from "@/composables/rules";

const { $authApi } = useNuxtApp();
console.log("🚀 ~ authApi:", $authApi);
const router = useRouter();
const loginForm = ref(null);
const isloading = ref(false);

const errorMsg = ref("");

const login = ref("");
const password = ref("");
const tokenApp = useRuntimeConfig().public.NUXT_ENV_APP_TOKEN;

async function checkInput() {
  // validate :rules
  const promise = loginForm.value.validate();
  promise.then((success) => {
    if (success.valid) {
      isloading.value = true;
      // check API for validation
      $authApi
        .checkAuth(login.value, password.value, tokenApp)
        .then((data) => {
          // add login & token in localStorage
          setStorage("login", login.value);
          setStorage("token", data.token);

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
