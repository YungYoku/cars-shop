import { getData, postData } from "@/js/api.js";

export default {
  namespaced: true,

  state: {
    favorite: [],
  },

  mutations: {
    set(state, favorite) {
      state.favorite = favorite;
    },

    reset(state) {
      state.favorite = [];
    },
  },

  getters: {
    favorite: (state) => state.favorite,
  },

  actions: {
    load({ commit }, user_id) {
      getData("manager/get-list-favorite-car", {
        user_id,
      }).then(({ cars }) => {
        commit("set", cars);
      });
    },

    async add({ dispatch }, { user_id, generation_id }) {
      await postData("manager/add-favorite", {
        user_id,
        generation_id,
      });
      await dispatch("load", user_id);
    },

    async remove({ commit, state }, { user_id, generation_id }) {
      await postData("manager/remove-favorite", {
        user_id,
        generation_id,
      });

      const _favorite = state.favorite.filter(
        (car) => car.id !== generation_id
      );
      commit("set", _favorite);
    },
  },
};
