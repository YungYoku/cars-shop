import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favorite: [],
  }),

  getters: {},

  actions: {
    set(state, favorite) {
      state.favorite = favorite;
    },

    reset(state) {
      state.favorite = [];
    },

    async load(user_id) {},

    async add({ user_id, generation_id }) {
      // await postData("manager/add-favorite", {
      //   user_id,
      //   generation_id,
      // });
      await this.load(user_id);
    },

    async remove({ user_id, generation_id }) {
      // await postData("manager/remove-favorite", {
      //   user_id,
      //   generation_id,
      // });

      const _favorite = this.favorite.filter((car) => car.id !== generation_id);
      this.set(_favorite);
    },
  },
});
