// todo REMOVE IF UNUSED
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: null,
      token: null,
    };
  },

  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      const tokens = useCookie("token");
      tokens.value = token;
      this.token = token;
    },
    logUserOut() {
      this.user = null;
      const tokens = useCookie("token");
      tokens.value = null;
      this.token = null;
    },
  },
});
