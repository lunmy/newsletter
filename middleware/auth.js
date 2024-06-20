import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { getStorage } from "@/composables/storage";
import jwtDecode from "jwt-decode";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useAuthStore());
  const router = useRouter();

  if (process.client) {
    if (!getStorage("token")) {
      console.log("NO TOKEN");
      navigateTo("/login");
    } else {
      // check expiration date of the token
      const token = getStorage("token");
      const decoded = jwtDecode(token);
      const limitDate = decoded.exp;
      // convert expiration date in milisecond
      const expirationDate = new Date(limitDate * 1000);
      if (expirationDate < new Date()) {
        navigateTo("/login");
      }
    }
  }

  // navigateTo(to.fullPath);
});
