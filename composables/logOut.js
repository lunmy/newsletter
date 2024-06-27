import { getStorage } from "@/composables/storage";
export function logOut() {
  if (getStorage("token")) {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    navigateTo(`/`);
  }
}
