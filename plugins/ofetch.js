import { ofetch } from "ofetch";
import authOfetch from "@/plugins/authOfetch";
import samarkandApi from "@/plugins/api";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const apiAuth = ofetch.create({
    baseURL: config.public.NUXT_ENV_AUTH_API_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const apiSamarkand = ofetch.create({
    baseURL: config.public.NUXT_ENV_API_SAMARKAND,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return {
    provide: {
      authApi: authOfetch({ apiFetch: apiAuth }),
      apiSamarkand: samarkandApi({ apiFetch: apiSamarkand }),
    },
  };
});
