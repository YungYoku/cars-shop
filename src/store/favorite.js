import { defineStore } from "pinia";
import { useUserStore } from "@/store/user";

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

    async load(uid) {},

    async add(brandId, modelId) {
      const userStore = useUserStore();
      const uid = userStore.uid;
      // await postData("manager/add-favorite", {
      //   user_id,
      //   generation_id,
      // });
      await this.load(uid);
    },

    async remove(brandId, modelId) {
      const userStore = useUserStore();
      const uid = userStore.uid;
      // await postData("manager/remove-favorite", {
      //   user_id,
      //   generation_id,
      // });

      const _favorite = this.favorite.filter((car) => car.id !== modelId);
      this.set(_favorite);
    },
  },
});
