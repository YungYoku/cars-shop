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
      return !!this.uid;
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
  },
});
