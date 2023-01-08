import { defineStore } from "pinia";
import { useUserStore } from "@/store/user";

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

    async add(generation_id) {
      const userStore = useUserStore();
      const uid = userStore.uid;
      // await postData("manager/add-ownership", {
      //   user_id,
      //   generation_id,
      // });

      await this.load(uid);
    },

    async remove(generation_id) {
      const userStore = useUserStore();
      const uid = userStore.uid;
      // await postData("manager/remove-ownership", {
      //   user_id,
      //   generation_id,
      // });

      const _cars = this.cars.filter((car) => car.id !== generation_id);
      this.set(_cars);
    },
  },
});
