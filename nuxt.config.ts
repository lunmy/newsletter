// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      NUXT_ENV_AUTH_API_BASE_URL: process.env.NUXT_ENV_AUTH_API_BASE_URL,
      NUXT_ENV_APP_TOKEN: process.env.NUXT_ENV_APP_TOKEN,
      NUXT_ENV_API_SAMARKAND: process.env.NUXT_ENV_API_SAMARKAND,
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "vuetify-nuxt-module", "@pinia/nuxt"],
  app: {
    head: {
      title: 'Samarkand',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/public/favicon.ico' }
      ]
    }
  }
});
