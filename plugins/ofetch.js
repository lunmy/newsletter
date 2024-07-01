import { ofetch } from "ofetch";
import authOfetch from "@/api/authOfetch";
import samarkandApi from "@/api/api";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  /**
   * create ofetch instance for authentificationAPI
   */
  const apiAuth = ofetch.create({
    baseURL: config.public.NUXT_ENV_API_SAMARKAND,
    headers: {
      Accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
  });

  /**
   * Create ofetch instance for SamarkandAPI
   */
  const apiSamarkand = ofetch.create({
    baseURL: config.public.NUXT_ENV_API_SAMARKAND,
    headers: {
      Accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    /**
     * Handles the request before it is sent, adding the token to the header if it is valid.
     * If the token is expired or not found, it redirects to the login page and throws an error.
     *
     * @param {Object} options - The options object containing the request details.
     * @throws {Error} - Throws an error if the token is expired or not found.
     */
    async onRequest({ options }) {
      const { token } = storeToRefs(useAuthStore());
      options.headers.Authorization = `Bearer ${token.value}`;
    },
  });

  return {
    provide: {
      authApi: authOfetch({ apiFetch: apiAuth }),
      apiSamarkand: samarkandApi({ apiFetch: apiSamarkand }),
    },
  };
});
