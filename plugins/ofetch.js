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

  const authOfetch = {
    async checkAuth(username, password, app) {
      return await instance("/auth", {
        method: "POST",
        body: {
          username,
          password,
          app,
        },
      });
    },
  };

  return {
    provide: {
      authApi: authOfetch,
    },
  };
});
