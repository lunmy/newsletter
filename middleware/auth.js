import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import {setStorage, getStorage} from "@/composables/storage";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useAuthStore());
  const token = getStorage('token')
  const router = useRouter();
  // see log when coming from home but don't seen when go to home from login
  console.log("middleware token",token);
  if (!user || user === "" || user === null || user === undefined) {
    return navigateTo("/login");
  }

  // var day = moment.unix(user.exp);
  // if (day < moment()) {
  //   return navigateTo("/login");
  // }
  return true;
});
