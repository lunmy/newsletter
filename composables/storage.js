import jwtDecode from "jwt-decode";

export function getStorage(key) {
  if (import.meta.client) {
    if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
    }
  }
  return null;
}

export function setStorage(key, value) {
  if (import.meta.client) {
    localStorage.setItem(key, value);
  }
}
/**
 * Check if the user is authenticated by validating the token stored in local storage.
 * If the token is valid and not expired, return true; otherwise, return false.
 *
 * @returns {boolean} - True if the user is authenticated, false otherwise.
 */
export function isAuth() {
  if (import.meta.client) {
    if (localStorage.getItem("token")) {
      const decoded = jwtDecode(localStorage.getItem("token"));
      return decoded.exp * 1000 > Date.now();
    }
  }
  return false;
}
