import { createApp } from 'vue';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';

export default defineNuxtPlugin((app) => {
    app.vueApp.use(PerfectScrollbarPlugin)
})



