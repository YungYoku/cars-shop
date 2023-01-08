import { defineStore } from "pinia";
import { useUserStore } from "@/store/user";
import { db } from "@/main";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export const useSavedStore = defineStore("saved", {
  state: () => ({
    cars: [],
  }),

  getters: {},

  actions: {
    set(state, cars) {
      state.cars = cars;
    },

    reset(state) {
      state.cars = [];
    },

    async load(uid) {},

    async add(brandId, modelId) {
      const userStore = useUserStore();
      const uid = userStore.uid;

      await updateDoc(doc(db, "users", uid), {
        saved: arrayUnion({ brandId, modelId }),
      });

      await this.load(uid);
    },

    async remove(brandId, modelId) {
      const userStore = useUserStore();
      const uid = userStore.uid;

      await updateDoc(doc(db, "users", uid), {
        saved: arrayRemove({ brandId, modelId }),
      });

      const _cars = this.cars.filter((car) => car.id !== modelId);
      this.set(_cars);
    },
  },
});
