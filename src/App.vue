<template>
  <v-app>
    <component :is="layout">
      <the-loading v-if="loading" />
      <router-view />
    </component>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultLayout from "@/layouts/Default.vue";
import ErrorLayout from "@/layouts/Error.vue";
import TheLoading from "@/components/TheLoading.vue";

export default {
  name: "app",

  components: { default: DefaultLayout, error: ErrorLayout, TheLoading },

  computed: {
    ...mapGetters(["loading"]),

    layout() {
      return this.$route.meta.layout || "default";
    },
  },

  mounted() {
    console.log("e");
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
