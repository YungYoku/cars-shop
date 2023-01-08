<template>
  <v-app>
    <component :is="layout">
      <the-loading v-if="loadingStore.loading" />
      <router-view />
    </component>
  </v-app>
</template>

<script>
import DefaultLayout from "@/layouts/Default.vue";
import ErrorLayout from "@/layouts/Error.vue";
import TheLoading from "@/components/TheLoading.vue";
import { useLoadingStore } from "@/store/loading";
import { useFiltersStore } from "@/store/filters";

export default {
  name: "app",

  components: { default: DefaultLayout, error: ErrorLayout, TheLoading },

  setup: () => ({
    loadingStore: useLoadingStore(),
    filtersStore: useFiltersStore(),
  }),

  computed: {
    layout() {
      return this.$route.meta.layout || "default";
    },
  },

  mounted() {
    this.filtersStore.loadBrands();
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  width: 100%;
  min-height: 100vh;
}
</style>
