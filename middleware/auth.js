import { getStorage } from "@/composables/storage";
import jwtDecode from "jwt-decode";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    if (!getStorage("token")) {
      return navigateTo("/login");
    } else {
      // check expiration date of the token
      const token = getStorage("token");
      const decoded = jwtDecode(token);
      const limitDate = decoded.exp;
      // convert expiration date in milisecond
      const expirationDate = new Date(limitDate * 1000);
      if (expirationDate < new Date()) {
        return navigateTo("/login");
      }
    }
  }

  return;
});
