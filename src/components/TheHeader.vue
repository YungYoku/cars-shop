<template>
  <v-app-bar prominent>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      variant="text"
      @click.stop="drawer = !drawer"
    />

    <v-toolbar-items class="hidden-sm-and-down">
      <router-link
        v-for="link in links"
        :key="link.title + link.url"
        :to="link.url"
        exact-path
      >
        <v-icon :icon="link.icon" />
        {{ link.title }}
      </router-link>

      <router-link
        v-if="userStore.user.status === 'admin'"
        exact-path
        to="/admin"
      >
        <v-icon icon="mdi-security" />
        Админка
      </router-link>

      <button v-if="userStore.isLoggedIn" @click="logout">
        <v-icon icon="mdi-exit-to-app" />
        ВЫЙТИ
      </button>
    </v-toolbar-items>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list class="mobile-nav" nav>
      <router-link
        v-for="link in links"
        :key="link.title + link.url"
        :to="link.url"
        exact-path
      >
        <v-icon :icon="link.icon" />
        {{ link.title }}
      </router-link>

      <router-link
        v-if="userStore.user.status === 'admin'"
        exact-path
        to="/admin"
      >
        <v-icon icon="mdi-security" />
        Админка
      </router-link>

      <button v-if="userStore.isLoggedIn" @click="logout">
        <v-icon icon="mdi-exit-to-app" />
        ВЫЙТИ
      </button>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { linksLogged, linksUnlogged } from "@/js/headerData.js";
import { useUserStore } from "@/store/user";
import { useSavedStore } from "@/store/myCars";
import { useFavoriteStore } from "@/store/favorite";

export default {
  name: "the-header",

  setup: () => ({
    userStore: useUserStore(),
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
      this.favoriteStore.$reset();
      this.savedStore.$reset();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
header {
  &.v-app-bar.v-toolbar {
    background-color: rgba(102, 135, 253, 1);
  }

  @supports (backdrop-filter: blur(20px)) {
    backdrop-filter: blur(20px);

    &.v-app-bar.v-toolbar {
      background-color: rgba(102, 135, 253, 0.65);
    }
  }

  .router-link-active {
    color: white;
  }

  a,
  button {
    margin: 0 10px;

    font-size: 16px;
    text-transform: uppercase;
    color: #333333;

    transition: all 0.3s;

    @media (max-width: 1024px) {
      font-size: 15px;
    }
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
  }
}

nav {
  .mobile-nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;

    padding: 30px 10px 10px 10px;
  }

  a {
    margin: 0;

    text-transform: uppercase;
  }
}
</style>
