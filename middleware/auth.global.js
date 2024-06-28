import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import jwtDecode from "jwt-decode";

/**
 * Middleware function to handle route authentication and token expiration.
 * Checks if the user is authenticated by verifying the token's expiration date.
 * If the token is expired or invalid, redirects to the login page.
 * Prevents infinite loop by avoiding redirection on the root path.
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const { token } = storeToRefs(useAuthStore());
  // if (import.meta.client) {
  if (token.value) {
    const decoded = jwtDecode(token.value);
    // convert expiration date in milisecond
    const expirationDate = new Date(decoded.exp * 1000);
    if (expirationDate > new Date()) {
      return;
    }
  }
  // }
  // avoid infinite loop
  if (to.path != "/") {
    return navigateTo("/");
  }
  return;
});
