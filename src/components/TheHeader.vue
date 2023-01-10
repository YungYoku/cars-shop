<template>
  <div class="header">
    <v-navigation-drawer v-model="drawer" app color="#9bb1ff" temporary>
      <v-list>
        <v-list-item v-for="link of links" :key="link.title">
          <router-link :to="link.url" exact-path>
            <img v-if="link.img" :src="link.img" alt="Картинка" />
            {{ link.title }}
          </router-link>
        </v-list-item>

        <v-list-item v-if="userStore.isLoggedIn">
          <button @click="logout">ВЫЙТИ</button>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#9bb1ff" dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <v-toolbar-title class="hidden-md-and-up">
        {{ routeName }}
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link
          v-for="link in links"
          :key="link.title + link.url"
          :to="link.url"
          exact-path
        >
          <img v-if="link.img" :src="link.img" alt="Картинка" />
          {{ link.title }}
        </router-link>
        <button v-if="userStore.isLoggedIn" @click="logout">ВЫЙТИ</button>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { linksLogged, linksUnlogged } from "@/js/headerData.js";
import { useUserStore } from "@/store/user";
import { useFiltersStore } from "@/store/filters";
import { useSavedStore } from "@/store/myCars";
import { useFavoriteStore } from "@/store/favorite";

export default {
  name: "the-header",

  setup: () => ({
    userStore: useUserStore(),
    filtersStore: useFiltersStore(),
    savedStore: useSavedStore(),
    favoriteStore: useFavoriteStore(),
  }),

  data() {
    return {
      drawer: false,
      group: null,
    };
  },

  computed: {
    routeName() {
      return this.$route.meta.title;
    },

    links() {
      return this.userStore.isLoggedIn ? linksLogged : linksUnlogged;
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    logout() {
      this.userStore.logout();
      this.filtersStore.$reset();
      this.favoriteStore.$reset();
      this.savedStore.$reset();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #9bb1ff;

  display: flex;
  align-items: center;
  justify-content: center;

  .router-link-active {
    color: white;
  }

  a,
  button {
    font-size: 16px;
    margin: 0 10px;
    color: #333333;
    transition: all 0.3s;
  }

  a:hover,
  button:hover {
    color: #ffffff;

    transition: all 0.1s;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
}
</style>
