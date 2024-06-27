import { isAuth } from "@/composables/storage";
export function logOut() {
  if (isAuth()) {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    navigateTo(`/`);
  }
}
