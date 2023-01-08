import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    uid: localStorage.uid || "",

    user: {
      favorite: [],
      name: "",
      regDate: "",
      saved: [],
      status: "",
    },
  }),

  getters: {
    isLoggedIn() {
      return this.uid.length > 0;
    },
  },

  actions: {
    updateUid(uid) {
      this.uid = uid;
      localStorage.uid = uid;
    },

    updateUser(user) {
      this.user = user;
    },

    logout() {
      this.uid = "";
      this.user = {
        favorite: [],
        name: "",
        regDate: "",
        saved: [],
        status: "",
      };
      localStorage.clear();
    },
  },
});
