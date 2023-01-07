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
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

const firebaseConfig = {
  apiKey: "AIzaSyDUuADedlg4-VSS3pK_hCu0i3LrXnKsGVg",
  authDomain: "car-shop-1.firebaseapp.com",
  projectId: "car-shop-1",
  storageBucket: "car-shop-1.appspot.com",
  messagingSenderId: "291678313321",
  appId: "1:291678313321:web:fe006f4e4d4971f3d2fbf8",
};

initializeApp(firebaseConfig);
export const db = getFirestore();

app.mount("#app");
