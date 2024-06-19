// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      NUXT_ENV_AUTH_API_BASE_URL: process.env.NUXT_ENV_AUTH_API_BASE_URL,
      NUXT_ENV_APP_TOKEN: process.env.NUXT_ENV_APP_TOKEN,
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "vuetify-nuxt-module", "@pinia/nuxt"],
});
