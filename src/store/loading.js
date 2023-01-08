import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loading: false,
  }),

  getters: {},

  actions: {
    startLoading(state) {
      state.loading = true;
    },

    endLoading(state) {
      state.loading = false;
    },
  },
});
