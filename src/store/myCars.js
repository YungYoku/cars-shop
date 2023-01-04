import { getData, postData } from "@/js/api.js";

export default {
  namespaced: true,

  state: {
    cars: [],
  },

  mutations: {
    set(state, cars) {
      state.cars = cars;
    },

    reset(state) {
      state.cars = [];
    },
  },

  getters: {
    cars: (state) => state.cars,
  },

  actions: {
    async load({ commit }, user_id) {
      await getData("manager/get-list-ownership-car", {
        user_id,
      }).then(({ cars }) => {
        commit("set", cars);
      });
    },

    async add({ dispatch }, { user_id, generation_id }) {
      await postData("manager/add-ownership", {
        user_id,
        generation_id,
      });
      await dispatch("load", user_id);
    },

    async remove({ commit, state }, { user_id, generation_id }) {
      await postData("manager/remove-ownership", {
        user_id,
        generation_id,
      });

      const _cars = state.cars.filter((car) => car.id !== generation_id);
      commit("set", _cars);
    },
  },
};
