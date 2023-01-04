import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/main.scss";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const app = createApp(App);
app.use(router);
app.use(store);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
app.use(vuetify);

//app.http.options.root = "https://catalogauto.we-demonstrate2.ru/api/";

// app.http.interceptors.before = function (request) {
//   if (this.previousRequest) {
//     this.previousRequest.abort();
//   }
//   this.previousRequest = request;
// };
//
// app.http.interceptors.push((request, next) => {
//   const access_token = localStorage.access_token || "";
//   const exception = request.url === "user/update-tokens";
//
//   if (access_token !== "" && !exception) {
//     request.headers.set("Authorization", access_token);
//   }
//
//   next((response) => {
//     if (response.status === 403) {
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("id");
//       sessionStorage.removeItem("refresh_token");
//       router.push("/login");
//     }
//   });
// });

app.mount("#app");
