import authOfetch from "@/plugins/authOfetch";
import { ofetch } from "ofetch";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const instance = ofetch.create({
    baseURL: config.public.NUXT_ENV_AUTH_API_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return {
    provide: {
      authApi: authOfetch({ ofetch: instance }),
    },
  };
});
