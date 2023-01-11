import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./assets/scss/main.scss";
import vuetify from "@/plugins/vuetify";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);

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
