import { defineStore } from "pinia";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/main";
import { useSavedStore } from "@/store/myCars";
import { useFavoriteStore } from "@/store/favorite";

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

    async loadUser() {
      await onSnapshot(doc(db, "users", this.uid), async (response) => {
        if (response.exists()) {
          this.user = response.data();

          const savedStore = useSavedStore();
          await savedStore.update();

          const favoriteStore = useFavoriteStore();
          await favoriteStore.update();
        }
      });
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
