import { defineStore } from "pinia";

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

    async load(user_id) {},

    async add({ user_id, generation_id }) {
      // await postData("manager/add-ownership", {
      //   user_id,
      //   generation_id,
      // });

      await this.load(user_id);
    },

    async remove({ user_id, generation_id }) {
      // await postData("manager/remove-ownership", {
      //   user_id,
      //   generation_id,
      // });

      const _cars = this.cars.filter((car) => car.id !== generation_id);
      this.set(_cars);
    },
  },
});
