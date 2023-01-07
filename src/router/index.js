import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Главная",
    },
    query: {
      brandName: "",
      brandId: "",
    },
  },

  {
    path: "/car",
    name: "Car",
    component: () => import("../views/CarView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Машина",
    },
    query: {
      id: "",
    },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      auth: false,
      layout: "default",
      title: "Логин",
    },
  },

  {
    path: "/reg",
    name: "Registration",
    component: () => import("../views/RegistrationView.vue"),
    meta: {
      auth: false,
      layout: "default",
      title: "Регистрация",
    },
  },

  {
    path: "/userCars",
    name: "UserCars",
    component: () => import("../views/UserCarsView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Мои Машины",
    },
  },

  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("../views/FavoriteView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Избранное",
    },
  },

  {
    path: "/users",
    name: "Users",
    component: () => import("../views/UsersView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Пользователи",
    },
  },

  {
    path: "/404",
    name: "Page404",
    component: () => import("../views/Page404View.vue"),
    meta: {
      auth: false,
      layout: "error",
      title: "404",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const isLoggedIn = !!localStorage.uid;

  if (to.name === "Page404") {
    return true;
  }

  if (to.meta.auth) {
    if (isLoggedIn) {
      return true;
    }

    return "/login";
  }

  if (!to.meta.auth) {
    if (isLoggedIn) {
      return "/";
    }

    return true;
  }
});

export default router;
