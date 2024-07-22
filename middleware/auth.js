import jwtDecode from "jwt-decode";
import {useCookie} from "nuxt/app";

/**
 * Middleware function to handle route authentication and token expiration.
 * Checks if the user is authenticated by verifying the token's expiration date.
 * If the token is expired or invalid, redirects to the login page.
 * Prevents infinite loop by avoiding redirection on the root path.
 *
 * @param {Object} to - The target route object.
 * @param {Object} from - The previous route object.
 * @returns {void} - Redirects if token is expired or invalid, otherwise continues.
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = await useCookie("token");
    if (import.meta.client) {
        console.log('aaaaa', token.value)
        if (token.value !== undefined) {
            const decoded = jwtDecode(token.value);
            // convert expiration date in milisecond
            const expirationDate = new Date(decoded.exp * 1000);
            if (expirationDate > new Date()) {
                return;
            }
        }
        if (to.path != "/") {
            return navigateTo("/");
        }
    }
    // avoid infinite loop
    return;
});
