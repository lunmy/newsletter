import { ofetch } from "ofetch";
import authOfetch from "@/api/authOfetch";
import samarkandApi from "@/api/api";
import { getStorage } from "@/composables/storage";
import jwtDecode from "jwt-decode";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  /**
   * create ofetch instance for authentificationAPI
   */
  const apiAuth = ofetch.create({
    baseURL: config.public.NUXT_ENV_AUTH_API_BASE_URL,
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
      const token = getStorage("token");
      if (token) {
        const decoded = jwtDecode(token);
        const expirationDate = new Date(decoded.exp * 1000);

        if (expirationDate > new Date()) {
          options.headers.Authorization = `Bearer ${token}`;
        } else {
          navigateTo("/");
          throw new Error("Token expired");
        }
      } else {
        navigateTo("/");
        throw new Error("No token found");
      }
    },
  });

  return {
    provide: {
      authApi: authOfetch({ apiFetch: apiAuth }),
      apiSamarkand: samarkandApi({ apiFetch: apiSamarkand }),
    },
  };
});
