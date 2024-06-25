import { ofetch } from "ofetch";
import authOfetch from "@/api/authOfetch";
import samarkandApi from "@/api/api";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const apiAuth = ofetch.create({
    baseURL: config.public.NUXT_ENV_AUTH_API_BASE_URL,
    headers: {
      Accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
  });

  const apiSamarkand = ofetch.create({
    baseURL: config.public.NUXT_ENV_API_SAMARKAND,
    headers: {
      Accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
  });

  return {
    provide: {
      authApi: authOfetch({ apiFetch: apiAuth }),
      apiSamarkand: samarkandApi({ apiFetch: apiSamarkand }),
    },
  };
});
