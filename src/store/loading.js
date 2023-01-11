import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loading: false,
  }),

  getters: {},

  actions: {
    start() {
      this.loading = true;
    },

    end() {
      this.loading = false;
    },
  },
});
