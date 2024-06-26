import { getStorage } from "@/composables/storage";
import jwtDecode from "jwt-decode";

export default defineNuxtRouteMiddleware((to, from) => {
  // check if user is authenticated
  if (import.meta.client) {
    if (getStorage("token")) {
      // check expiration date of the token
      const token = getStorage("token");
      const decoded = jwtDecode(token);
      const limitDate = decoded.exp;
      // convert expiration date in milisecond
      const expirationDate = new Date(limitDate * 1000);
      // if not expired
      if (expirationDate > new Date()) {
        return;
      }
    }
  }
  // test to avoid infinite loop
  if (to.path != from.path) {
    // no token or invalid token redirect to login page
    return navigateTo("/");
  }
});
