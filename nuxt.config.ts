import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import {fr} from 'vuetify/locale'
import colors from 'vuetify/lib/util/colors'
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            NUXT_ENV_API: process.env.NUXT_ENV_API,
            DEFAULT_COMPANY_ID : process.env.DEFAULT_COMPANY_ID
        },
    },
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/tailwindcss",
        "vuetify-nuxt-module",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "@nuxt/image"
    ],
    app: {
        head: {
            title: "Samarkand",
            link: [
                { rel: "icon", type: "image/x-icon", href: "/public/favicon.ico" },
            ],
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build: {
        transpile: ['vuetify'],
        postcss: false,
    },
    vite: {
        optimizeDeps: {exclude: ["fsevents"]},
        define: {
            'process.env.DEBUG': false,
        },
        ssr: {
            noExternal: ["vuetify"],
        },
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    vuetify: {
        moduleOptions: {
            treeshaking: true ,
            useIconCDN: true,
            /* vite-plugin-vuetify options */
            styles: false ,
            autoImport: true,
            useVuetifyLabs: true,
        },
        vuetifyOptions: './vuetify.config.ts',
    }
});