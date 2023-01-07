import { createStore } from "vuex";
import router from "@/router";
import { postData } from "@/js/api.js";

import favorite from "./favorite.js";
import filters from "./filters.js";
import myCars from "./myCars.js";

export default createStore({
  state: {
    logged: !!localStorage.uid,
    loading: false,

    user: {
      uid: localStorage.uid || "",
      name: "",
      date: "",
    },

    authErrors: {
      wrongPassword: false,
      emailExists: false,
    },
  },

  mutations: {
    setUid(state, uid) {
      localStorage.uid = uid;
      state.uid = uid;
    },

    startLoading(state) {
      state.loading = true;
    },

    endLoading(state) {
      state.loading = false;
    },

    setUserData(state, content) {
      state.user = content.user;
      localStorage.id = content.user.id;
      localStorage.access_token = "Bearer " + content.tokens.access_token;
      sessionStorage.refresh_token = content.tokens.refresh_token;
    },

    setAuthErrors(state, { wrongPassword = false, emailExists = false }) {
      state.authErrors = {
        wrongPassword,
        emailExists,
      };
    },

    resetAuthErrors(state) {
      state.authErrors = {
        wrongPassword: false,
        emailExists: false,
      };
    },
  },

  getters: {
    logged: (state) => state.logged,

    loading: (state) => state.loading,

    id: (state) => state.user.id,

    wrongPassword: (state) => state.authErrors.wrongPassword,

    emailExists: (state) => state.authErrors.emailExists,
  },

  actions: {
    register({ dispatch, commit }, info) {
      postData("user/sing-up", info)
        .then(() => {
          dispatch("login", info);
        })
        .catch(() => {
          commit("setAuthErrors", { emailExists: true });
        });
    },

    login({ commit }, info) {
      postData("user/sing-in", info)
        .then(async (content) => {
          commit("setUserData", content);
          commit("setLogged", true);
          await router.push("/");
        })
        .catch(() => {
          commit("setAuthErrors", { wrongPassword: true });
        });
    },

    refreshTokens({ commit }, rtoken) {
      postData("user/update-tokens", {}, { rtoken }).then(async (response) => {
        if (response !== {}) {
          commit("setTokens", response.content);
        }
      });
    },

    async logout({ dispatch }) {
      dispatch("reset");
      localStorage.clear();
      await router.push("/login");
    },

    reset({ state, commit }) {
      state.logged = false;

      state.user = {
        uid: "",
        name: "",
        date: "",
      };

      state.authErrors = {
        wrongPassword: false,
        emailExists: false,
      };

      commit("favorite/reset");
      commit("filters/reset");
      commit("myCars/reset");
    },
  },

  modules: { favorite, filters, myCars },
});
